import { useState, useEffect } from 'react';
import axios from 'axios';
import * as constants from '../Constants';
import { useSessionContext } from './useSessionContext';

/**
 * Custom hook to fetch volcanoes data from the backend.
 * 
 * This hook retrieves the list of volcanoes based on the current session ID and manages
 * loading state and the fetched data.
 * 
 * @returns {Object} An object containing the volcanoes array and the loading state.
 */
const useFetchVolcanoes = () => {
    // State to hold the list of volcanoes
    const [volcanoes, setVolcanoes] = useState([]);
    
    // State to track the loading status
    const [isLoading, setIsLoading] = useState(true);

    // Proxy URL for the API endpoint
    const proxy = constants.PROXY;

    // Get the session ID from the SessionContext
    const { sessionId } = useSessionContext();

    /**
     * Effect to fetch the list of volcanoes from the backend when the component mounts or
     * when proxy or sessionId changes.
     */
    useEffect(() => {
        // Define the asynchronous function to fetch data
        const fetchData = async () => {
            try {
                // Make a POST request to fetch volcanoes data
                const volcanoesResponse = await axios.post(`${proxy}/volcano/getVolcStd`, { sessionId });
                
                // Update state with the fetched list of volcanoes
                setVolcanoes(volcanoesResponse.data.volcanoes);
                
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

    // Return the list of volcanoes and loading state
    return { volcanoes, isLoading };
};

export default useFetchVolcanoes;
