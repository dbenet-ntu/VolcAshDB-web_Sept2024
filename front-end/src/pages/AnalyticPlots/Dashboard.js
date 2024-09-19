import { useState, useEffect } from 'react';
import { Row } from 'antd';
import RiseLoader from "react-spinners/RiseLoader";
import Switch from 'react-switch'; 
import PieChart from './PieChart';
import * as constants from "../../Constants";
import ParticleTernaryPlot from './ParticleTernaryPlot';
import ParticleTernaryPlotEruptiveStyle from './ParticleTernaryPlotEruptiveStyle';
import PCAAllParticles2d from './PCAAllParticles2d';
import PCAJuvenile2d from './PCAJuvenile2d';
import PCAExperimentalData from './PCAExperimentalData';
import HistogramParticles from './HistogramParticles';
import HistogramParticlesVolcanoes from './HistogramParticlesVolcanoes';
import { DashBoardStyle } from './Dashboard.styles';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useSessionContext } from '../../hooks/useSessionContext';
import PopUp from '../PopUp/popUp'; 
import InformationPopUp from '../PopUp/InformationPopUp/InformationPopUp';

// Import axios for making HTTP requests
const axios = require('axios');

/**
 * Dashboard Component: Displays various charts and graphs based on user and session data.
 * 
 * @param {object} props - Component properties.
 * @param {string} props.visibilityMode - Current visibility mode for chart colors.
 * 
 * @returns {JSX.Element} - The rendered component.
 */
const Dashboard = ({ visibilityMode }) => {
    // Styles for the dashboard
    const classes = DashBoardStyle();
    
    // Proxy URL for API requests
    const proxy = constants.PROXY;

    // State to manage fetched data and loading state
    const [data, setData] = useState({ particles: [], opinion: { particles: [], opinions: [] } });
    const [loading, setLoading] = useState(true);

    // Authentication and session context
    const { sessionId } = useSessionContext();
    const { user } = useAuthContext();

    // Extract user role from token
    const userRole = user ? JSON.parse(atob(user.token.split('.')[1])).role : null;

    // State for toggles and popup visibility
    const [displayUserData, setDisplayUserData] = useState(false);
    const [displayExperimentalData, setDisplayExperimentalData] = useState(false);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    // Fetch data on component mount or when dependencies change
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let fetchedData = { particles: [], opinion: { particles: [], opinions: [] } };

                if (sessionId && user) {
                    const userId = JSON.parse(atob(user.token.split('.')[1]))._id;
                    // Fetch opinion and particle data
                    const [opinionResponse, particlesResponse] = await Promise.all([
                        axios.post(`${proxy}/opinion/get`, { userId, sessionId }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user.token}`
                            }
                        }),
                        axios.post(`${proxy}/particle/get`, { sessionId }),
                    ]);
                    fetchedData = { opinion: opinionResponse.data, particles: particlesResponse.data.particles };
                } else if (sessionId && !user) {
                    // Fetch only particle data
                    const particlesResponse = await axios.post(`${proxy}/particle/get`, { sessionId });
                    fetchedData.particles = particlesResponse.data.particles;
                }
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);  // Set loading to false when data fetch is complete
            }
        };

        fetchData();
    }, [user, proxy, sessionId]);

    // Handler for user data toggle switch
    const handleUserToggleChange = (checked) => {
        setDisplayUserData(checked);
    };

    // Handler for data type toggle switch
    const handleDataTypeToggleChange = (checked) => {
        setDisplayExperimentalData(checked);
    };

    // Select and filter data based on toggles
    const selectedData = displayUserData ? data.opinion.particles : data.particles;
    const filteredData = (selectedData && selectedData.length > 0) ? selectedData.filter(particle => displayExperimentalData ? particle.type === 'experimental' : particle.type === 'natural') : [];

    // Check if there are juvenile particles
    const hasJuvenile = filteredData.some(particle => particle.main_type?.juvenile === 100);

    // Custom icon for switch component
    const CustomIcon = ({ text }) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            fontSize: 12,
            color: 'white',
            paddingRight: 2,
            paddingLeft: 2,
            paddingTop: 1,
        }}>
            {text}
        </div>
    );

    return (
        <div style={{ backgroundColor: 'white', paddingTop: '10px' }}>
            {/* Toggle Switch for Authenticated Users */}
            {['team member', 'annotator'].includes(userRole) && (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Switch
                        className={classes.switch}
                        onChange={handleUserToggleChange}
                        checked={displayUserData}
                        onColor="#006837"
                        offColor="#0c4aad"
                        height={40}
                        width={160}  // Increase the width of the switch
                        handleDiameter={36}
                        checkedIcon={<CustomIcon text="User Statistic" />}
                        uncheckedIcon={<CustomIcon text="Global Statistic" />}
                    />
                </div>
            )}

            {/* Toggle Switch for Data Type */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Switch
                    className={classes.switch}
                    onChange={handleDataTypeToggleChange}
                    checked={displayExperimentalData}
                    onColor="#ff9900"
                    offColor="#006837"
                    height={40}
                    width={200}  // Increase the width of the switch
                    handleDiameter={36}
                    checkedIcon={<CustomIcon text="Experimental Data" />}
                    uncheckedIcon={<CustomIcon text="Natural Data" />}
                />
            </div>

            {/* PopUp component */}
            {isPopUpOpen && (
                <PopUp onClose={() => setIsPopUpOpen(false)}>
                    <InformationPopUp />
                </PopUp>
            )}

            {/* Loading state */}
            {!isPopUpOpen && loading ? (
                <div style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '0px' }}>
                    <RiseLoader
                        cssOverride={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "450px",
                        }}
                        size={10}
                        color={"#123abc"}
                        loading={loading}
                    />
                </div>
            ) : !isPopUpOpen && filteredData.length > 0 ? (
                <div>
                    {!displayExperimentalData && (
                        <div>
                            {/* Display charts and plots for natural data */}
                            <Row wrap={true} style={{ paddingTop: '50px', display: 'flex', wrap: 'wrap', justifyContent: "space-evenly" }}>
                                <div className={classes.ChartOverlay}>
                                    <PieChart visibilityMode={visibilityMode} data={filteredData} title={() => 'volc_name'} />
                                </div>

                                <div className={classes.ChartOverlay}>
                                    <PieChart visibilityMode={visibilityMode} data={filteredData} title={() => 'main_type'} />
                                </div>
                                
                                <div className={classes.ChartOverlay}>
                                    <PieChart visibilityMode={visibilityMode} data={filteredData} title={() => 'eruptive_style'} />
                                </div>
                            </Row>

                            <Row wrap={true} style={{ paddingTop: '50px', display: 'flex', wrap: 'wrap', justifyContent: "space-evenly" }}>
                                <div className={classes.ChartOverlay}>
                                    <ParticleTernaryPlot visibilityMode={visibilityMode} data={filteredData} />
                                </div>
                                <div className={classes.ChartOverlay}>
                                    <ParticleTernaryPlotEruptiveStyle visibilityMode={visibilityMode} data={filteredData} />
                                </div>
                            </Row>

                            <Row wrap={true} style={{ paddingTop: '50px', display: 'flex', wrap: 'wrap', justifyContent: "space-evenly" }}>
                                <div className={classes.ChartOverlay}>
                                    <PCAAllParticles2d visibilityMode={visibilityMode} data={filteredData} />
                                </div>
                                
                                {hasJuvenile && (
                                    <div className={classes.ChartOverlay}>
                                        <PCAJuvenile2d visibilityMode={visibilityMode} data={filteredData} />
                                    </div>
                                )}
                            </Row>

                            <Row wrap={true} style={{ paddingTop: '50px', display: 'flex', wrap: 'wrap', justifyContent: "space-evenly" }}>
                                <div className={classes.ChartOverlay}>
                                    <HistogramParticles visibilityMode={visibilityMode} data={filteredData} onOpen={() => setIsPopUpOpen(true)} />
                                </div>
                                <div className={classes.ChartOverlay}>
                                    <HistogramParticlesVolcanoes visibilityMode={visibilityMode} data={filteredData} onOpen={() => setIsPopUpOpen(true)}/>
                                </div>
                            </Row>
                        </div>
                    )}
                    {displayExperimentalData && (
                        <div>
                            {/* Display charts and plots for experimental data */}
                            <Row wrap={true} style={{ paddingTop: '50px', display: 'flex', wrap: 'wrap', justifyContent: "space-evenly" }}>
                                <div className={classes.ChartOverlay}>
                                    <PieChart visibilityMode={visibilityMode} data={filteredData} title={() => 'volc_name'} />
                                </div>
                                
                                <div className={classes.ChartOverlay}>
                                    <PieChart visibilityMode={visibilityMode} data={filteredData} title={() => 'eruptive_style'} />
                                </div>
                            </Row>

                            <Row wrap={true} style={{ paddingTop: '50px', display: 'flex', wrap: 'wrap', justifyContent: "space-evenly" }}>
                                <div className={classes.ChartOverlay}>
                                    <PCAExperimentalData visibilityMode={visibilityMode} data={filteredData} />
                                </div>
                            </Row>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '0px' }}>
                    <h3>Sorry, there is no data to display!</h3>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
