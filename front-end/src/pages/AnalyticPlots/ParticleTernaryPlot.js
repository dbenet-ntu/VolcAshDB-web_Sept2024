import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import RiseLoader from "react-spinners/RiseLoader";
import { useLoading } from '../../hooks/useLoading';
import * as constants from "../../Constants";

/**
 * ParticleTernaryPlot Component: Renders a ternary plot of particle types by sample.
 * 
 * @param {object} props - The component props.
 * @param {Array} props.data - The dataset used for plotting the ternary plot.
 * @param {string} props.visibilityMode - Mode used for determining marker colors in the plot.
 */
const ParticleTernaryPlot = (props) => {
    const { data, visibilityMode } = props;
    const [plotData, setPlotData] = useState([]); // State for storing ternary plot data
    const { load, loading } = useLoading(); // Custom hook for handling loading state

    /**
     * Effect hook for loading data when component mounts or data changes.
     */
    useEffect(() => {
        load([data]);
    }, [load, data]);

    /**
     * Effect hook for processing data and updating plotData when data or loading state changes.
     */
    useEffect(() => {
        if (!loading) {
            const counts = {}; // Object to hold counts for each afe_code
            const totals = {}; // Object to hold total counts for each afe_code
            const volcNames = {}; // Object to hold volcano names for each afe_code
            const afeDates = {}; // Object to hold dates for each afe_code
    
            // Aggregate counts and store additional information
            data.forEach(particle => {
                const { afe_code, main_type, volc_name, afe_date } = particle;
    
                // Aggregate counts for main_type categories
                Object.entries(main_type).forEach(([type, value]) => {
                    if (!counts[afe_code]) {
                        counts[afe_code] = { total: 0 };
                    }
                    counts[afe_code][type] = (counts[afe_code][type] || 0) + value;
                    counts[afe_code].total += value;
                });
    
                totals[afe_code] = (totals[afe_code] || 0) + 1;
    
                // Store volc_name and afe_date for each afe_code
                volcNames[afe_code] = volc_name;
                afeDates[afe_code] = afe_date.split('T')[0];
            });
        
            // Convert counts to percentages and construct plotData
            const plotData = Object.keys(counts).map((afe_code) => {
                const types = counts[afe_code];
                return {
                    type: 'scatterternary',
                    mode: 'markers',
                    a: [types['juvenile'] / types.total * 100 || 0], // Percentage for 'juvenile'
                    b: [types['lithic'] / types.total * 100 || 0], // Percentage for 'lithic'
                    c: [types['altered material'] / types.total * 100 || 0], // Percentage for 'altered material'
                    text: [`${volcNames[afe_code]}, ${afeDates[afe_code]}`], // Hover text
                    subplot: 'ternary',
                    name: '',
                    marker: { 
                        size: 12,
                        color: constants.visibilityColors[visibilityMode][afe_code] // Color based on visibility mode
                    },
                    hovertemplate:
                        "<b>%{text}</b><br><br>" +
                        "Juvenile: %{a:.2f}%<br>" +
                        "Lithic: %{b:.2f}%<br>" +
                        "Altered material: %{c:.2f}%<br>"
                };
            });
    
            setPlotData(plotData); // Update plot data state
        }
    }, [data, loading, visibilityMode]);

    if (loading) {
        return (
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
        ); // Render loading indicator while data is being fetched
    }

    return (
        <Plot
            data={plotData}
            layout={{
                title: 'Ratio of particle types by sample', // Title of the ternary plot
                ternary: {
                    sum: 100, // Total sum of a, b, c should be 100%
                    aaxis: { hoverformat: '.2f', ticksuffix: '%', title: 'Juvenile', min: 0 }, // Axis settings for Juvenile
                    baxis: { hoverformat: '.2f', ticksuffix: '%', title: 'Lithic', min: 0 }, // Axis settings for Lithic
                    caxis: { hoverformat: '.2f', ticksuffix: '%', title: 'Altered material', min: 0 } // Axis settings for Altered material
                },
                showlegend: false, // Disable legend
                width: 350, // Width of the plot
                height: 350, // Height of the plot
                paper_bgcolor: '#e9e9e9f7', // Background color of the plot paper
                plot_bgcolor: '#e9e9e9f7', // Background color of the plot area
            }}
        />
    );
};

export default ParticleTernaryPlot;