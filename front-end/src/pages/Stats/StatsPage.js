import { useState, useEffect } from 'react';
import { Row } from 'antd';
import * as constants from "../../Constants";
import { StatsPageStyle } from './StatsPage.styles';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useSessionContext } from '../../hooks/useSessionContext';
import TimelinePlot from '../AnalyticPlots/TimelinePlot';
import axios from 'axios';

/**
 * StatsPage: Component for displaying statistical data including total users and daily metrics.
 * Utilizes hooks for fetching data and context management to display relevant statistics.
 * 
 * @param {string} visibilityMode - Mode to control the visibility of the plots.
 * @returns {JSX.Element} - The rendered StatsPage component.
 */
const StatsPage = ({ visibilityMode }) => {
    // Hook for applying styles from StatsPage.styles
    const classes = StatsPageStyle();
    
    // Constants for API proxy and session management
    const proxy = constants.PROXY;
    const { sessionId } = useSessionContext();
    const { user } = useAuthContext();
    const userRole = user ? JSON.parse(atob(user.token.split('.')[1])).role : null;

    // State variables for storing fetched data
    const [totalUsers, setTotalUsers] = useState(0);
    const [requestsPerDay, setRequestsPerDay] = useState([]);
    const [usersPerDay, setUsersPerDay] = useState([]);

    useEffect(() => {
        /**
         * fetchData: Fetches statistical data from the backend API.
         * Uses axios to make POST requests and updates state with the fetched data.
         */
        const fetchData = async () => {
            try {
                if (user && userRole === 'team member') {
                    // Fetch total users, requests per day, and users per day
                    const [totalUsersResponse, requestsPerDayResponse, usersPerDayResponse] = await Promise.all([
                        axios.post(`${proxy}/stats/total-users`, { sessionId }, { 
                            headers: {
                                'Content-Type': 'application/json', 
                                'Authorization': `Bearer ${user.token}`
                            }
                        }),
                        axios.post(`${proxy}/stats/requests-per-day`, { sessionId }, { 
                            headers: {
                                'Content-Type': 'application/json', 
                                'Authorization': `Bearer ${user.token}`
                            }
                        }),
                        axios.post(`${proxy}/stats/users-per-day`, { sessionId }, { 
                            headers: {
                                'Content-Type': 'application/json', 
                                'Authorization': `Bearer ${user.token}`
                            }
                        }),
                    ]);

                    // Update state with the fetched data
                    setTotalUsers(totalUsersResponse.data.totalUsers);
                    setRequestsPerDay(requestsPerDayResponse.data);
                    setUsersPerDay(usersPerDayResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user, proxy, sessionId, userRole]);

    return (
        <div className={classes.ResultContainer}>
            {/* Title section */}
            <div className={classes.title}>
                <h1>Statistic Menu</h1>
            </div>

            {/* Container for statistical charts */}
            <Row wrap={true} className={classes.ChartContainer}>
                <div className={classes.ChartOverlay}>
                    {/* Display total number of users */}
                    <h2>{totalUsers}</h2>
                    <h4>Total Users</h4>
                </div>
                <div className={classes.ChartOverlay}>
                    {/* Display requests per day chart */}
                    <TimelinePlot
                        title="Requests Per Day"
                        data={requestsPerDay}
                        visibilityMode={visibilityMode}
                    />
                </div>
                <div className={classes.ChartOverlay}>
                    {/* Display users per day chart */}
                    <TimelinePlot
                        title="Users Per Day"
                        data={usersPerDay}
                        visibilityMode={visibilityMode}
                    />
                </div>
            </Row>
        </div>
    );
};

export default StatsPage;