import { useState, useEffect } from 'react';
import axios from 'axios';
import * as constants from '../Constants';
import { useSessionContext } from './useSessionContext';

/**
 * Custom hook to fetch sample data from the backend.
 * 
 * This hook retrieves sample data from the server based on the current session ID and manages
 * loading state and the fetched data.
 * 
 * @returns {Object} An object containing the samples array and the loading state.
 */
const useFetchSamples = () => {
    // State to hold the fetched sample data
    const [samples, setSamples] = useState([]);
    
    // State to track the loading status
    const [isLoading, setIsLoading] = useState(true);

    // Proxy URL for the API endpoint
    const proxy = constants.PROXY;

    // Get the session ID from the SessionContext
    const { sessionId } = useSessionContext();

    /**
     * Effect to fetch sample data from the backend when the component mounts or
     * when proxy or sessionId changes.
     */
    useEffect(() => {
        // Define the asynchronous function to fetch data
        const fetchData = async () => {
            try {
                // Make a POST request to fetch samples data
                const samplesResponse = await axios.post(`${proxy}/afe/get`, { sessionId });
                
                // Update state with the fetched sample data
                setSamples(samplesResponse.data.afes);
                
                // Set loading state to false after data is fetched
                setIsLoading(false);
            } catch (error) {
                // Log any errors encountered during data fetching
                console.log('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, [proxy, sessionId]); // Dependency array: effect runs when 'proxy' or 'sessionId' changes

    // Return the samples and loading state
    return { samples, isLoading };
};

export default useFetchSamples;
