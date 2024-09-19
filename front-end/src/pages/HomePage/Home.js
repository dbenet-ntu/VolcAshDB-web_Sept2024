import { Button, Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { HomeStyle } from './Home.styles'
import clsx from 'clsx';
import catalogue_icon from '../../assets/images/catalogue_icon.png'
import plots_icon from '../../assets/images/plots_icon.png'
import IPGP_logo from '../../assets/images/IPGP_logo.png'
import EOS_logo from '../../assets/images/EOS_logo.png'
import WorldMap from './WorldMap'
import useFetchTotalParticles from '../../hooks/useFetchTotalParticles';

/**
 * Home: The main landing page component for the VolcAshDB platform.
 * 
 * Displays an introduction to the VolcAshDB platform, including high-level information about its purpose, goals, and features.
 * The component also provides navigation buttons to various parts of the application and displays citations and recent publications.
 * 
 * @param {object} props - The properties passed to the component.
 * @param {boolean} props.visibilityMode - Determines if certain elements should be visible based on the application mode.
 * 
 * @returns {JSX.Element} - The rendered Home page component.
 */
function Home({ visibilityMode }) {
    const classes = HomeStyle(); // Custom styles for the component
    const navigate = useNavigate(); // Hook to programmatically navigate
    const { totalParticles } = useFetchTotalParticles(); // Custom hook to fetch the total number of particles

    return (
        <div className={classes.BodyContainer}>
            <div className={classes.BodyContent}>
                
                {/* Header section with logos and main heading */}
                <div className={classes.titleWithBadges}>
                    <img src={IPGP_logo} alt="Institution Badge Left" className={classes.IPGP_logo} />
                    <img src={EOS_logo} alt="Institution Badge Right" className={classes.EOS_logo} />
                    <Typography className={clsx(classes.mainHeading)}>
                        The web-based platform Volcanic Ash DataBase (VolcAshDB)
                    </Typography>
                </div>

                {/* Introduction and description of VolcAshDB */}
                <Typography className={classes.GoalText}>
                    VolcAshDB is a database of optical microscope images and physical characteristics (shape, texture and color) of volcanic ash particles. VolcAshDB's goal is to help establish a standardized methodology for volcanic ash particle classification. Hosting over {totalParticles} high-resolution images from various magma compositions and eruptive styles, VolcAshDB enables comparative studies and aids in the creation of Machine Learning models for automated classification.
                    <br />
                    <br />
                    <p style={{ fontSize: '12px' }}>
                        Version 0.1 of Dataset published 2024 in Centre de données de l'Institut de Physique du Globe de Paris
                        <a style={{ paddingLeft: '5px' }} href="https://doi.org/10.18715/ipgp.2024.lx32oxw9" target="_blank" rel="noopener noreferrer">
                            https://doi.org/10.18715/ipgp.2024.lx32oxw9
                        </a>
                    </p>
                </Typography>

                {/* Navigation buttons */}
                <div className={classes.BodyBtn}>
                    <Button className={classes.BtnAbout} onClick={() => navigate("/about")}>VolcAshDB</Button>
                    <br />
                </div>

                {/* Options section with icons and navigation buttons */}
                <div className={classes.BodyOption}>
                    <div style={{ textAlign: "center" }}>
                        <img src={catalogue_icon} alt="Catalogue Icon" className={classes.iconStyle} />
                        <br />
                        <Button className={classes.Btn} onClick={() => navigate("/catalogue")}>Catalogue</Button>
                        <span className={classes.descriptionText}>Image browser</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <img src={plots_icon} alt="Plots Icon" className={classes.iconStyle} />
                        <br />
                        <Button className={classes.Btn} onClick={() => navigate("/analytic")}>Plots</Button>
                        <span className={classes.descriptionText}>Data visualization</span>
                    </div>
                </div>

                {/* WorldMap component displaying a map based on visibilityMode */}
                <WorldMap visibilityMode={visibilityMode} />

                {/* Publications section with citation and recent publications */}
                <span className={classes.publicationsContainer}>
                    <div>
                        <strong>To use our contents </strong> please cite: Benet, D., Costa, F., Widiwijayanti, C., Pallister, J., Pedreros, G., Allard, P., Humaida, H., Aoki, Y. and Maeno, F., 2024. VolcAshDB: a Volcanic Ash DataBase of classified particle images and features. Bulletin of Volcanology, 86(1), pp.1-30.
                        <br />
                        <a href="https://doi.org/10.1007/s00445-023-01695-4" target="_blank" rel="noopener noreferrer">
                            https://doi.org/10.1007/s00445-023-01695-4
                        </a>
                    </div>
                    <div className={classes.LatestPublications}>
                        <h2>Latest Publications</h2>
                        <ul>
                            <li>
                                <strong>2024</strong> Benet, D., Costa, F., Widiwijayanti, C. Volcanic ash classification through Machine Learning. <em>Geochemistry, Geophysics, Geosystems</em>.
                                <br />
                                <a href="https://doi.org/10.1029/2023GC011224" target="_blank" rel="noopener noreferrer">
                                    https://doi.org/10.1029/2023GC011224
                                </a>
                            </li>
                            <li>
                                <strong>2024</strong> Benet, D., Costa, F., Widiwijayanti, C., Pallister, J., Pedreros, G., Allard, P., Humaida, H., Aoki, Y., and Maeno, F. VolcAshDB: a Volcanic Ash DataBase of classified particle images and features. <em>Bulletin of Volcanology</em>, 86(1), pp.1-30.
                                <br />
                                <a href="https://doi.org/10.1007/s00445-023-01695-4" target="_blank" rel="noopener noreferrer">
                                    https://doi.org/10.1007/s00445-023-01695-4
                                </a>
                            </li>
                        </ul>
                    </div>
                </span>
            </div>
        </div>
    );
}

export default Home;
