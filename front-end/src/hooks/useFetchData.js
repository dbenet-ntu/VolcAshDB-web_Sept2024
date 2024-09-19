import { useState, useEffect } from 'react';
import axios from 'axios';
import * as constants from '../Constants';
import { useSessionContext } from './useSessionContext';

/**
 * Custom hook to fetch and manage data from multiple API endpoints.
 * This hook is responsible for retrieving particles, volcanoes, eruptions, AFE, and tags data.
 * It handles both experimental and natural particle data based on the displayExperimentalData flag.
 *
 * @param {boolean} displayExperimentalData - Flag to determine whether to fetch experimental or natural data.
 * @returns {object} Contains the fetched data (particles, volcanoes, eruptions, etc.) and a loading state.
 */
const useFetchData = (displayExperimentalData) => {
    // State variables for storing fetched data
    const [particles, setParticles] = useState([]);
    const [particlesExamples, setParticlesExamples] = useState([]);
    const [volcanoes, setVolcanoes] = useState([]);
    const [eruptions, setEruptions] = useState([]);
    const [AFE, setAFE] = useState([]);
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // Loading state

    const proxy = constants.PROXY;  // Proxy URL for API calls
    const { sessionId } = useSessionContext();  // Access sessionId from SessionContext

    useEffect(() => {
        // Fetches data from multiple API endpoints using axios
        const fetchData = async () => {
            try {
                setIsLoading(true);  // Set loading state to true before the request starts

                // Perform multiple API requests in parallel using Promise.all
                const [particlesResponse, particlesExamplesResponse, volcanoesResponse, eruptionsResponses, AFEResponse, tagsResponse] = await Promise.all([
                    axios.post(`${proxy}/particle/get`, { sessionId }),
                    axios.post(`${proxy}/particle/getExamples`, { sessionId }),
                    axios.post(`${proxy}/volcano/getVolcStd`, { sessionId }),
                    axios.post(`${proxy}/eruption/get`, { sessionId }),
                    axios.post(`${proxy}/afe/get`, { sessionId }),
                    axios.post(`${proxy}/particle/tags`, { sessionId })
                ]);

                // Extract all particles and volcanoes from the response data
                const allParticles = particlesResponse.data.particles;
                const allVolcanoes = volcanoesResponse.data.volcanoes;

                // Filter particles based on their type (either 'experimental' or 'natural')
                const filteredParticles = allParticles.filter(p =>
                    p.type === (displayExperimentalData ? 'experimental' : 'natural')
                );

                // Filter volcanoes by matching volc_num with the filtered particles
                const filteredVolcanoes = allVolcanoes.filter(volcano =>
                    filteredParticles.some(particle => particle.volc_num === volcano.volc_num)
                );

                // Update state with the fetched and filtered data
                setParticles(filteredParticles);
                setParticlesExamples(particlesExamplesResponse.data.particles);
                setVolcanoes(filteredVolcanoes);
                setEruptions(eruptionsResponses.data.eruptions);
                setAFE(AFEResponse.data.afes);
                setTags(tagsResponse.data.tags);

                setIsLoading(false);  // Set loading state to false after data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);  // Log any errors
            }
        };

        fetchData();  // Trigger the data fetch when the component mounts or dependencies change
    }, [proxy, sessionId, displayExperimentalData]);

    // Return the fetched data and loading state
    return { particles, particlesExamples, volcanoes, eruptions, AFE, tags, isLoading };
};

export default useFetchData;
