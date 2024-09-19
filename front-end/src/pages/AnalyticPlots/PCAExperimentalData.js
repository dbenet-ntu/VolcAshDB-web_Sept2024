import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import RiseLoader from "react-spinners/RiseLoader";
import { useLoading } from '../../hooks/useLoading';
import * as constants from "../../Constants";

const { PCA } = require('ml-pca');

/**
 * PCAExperimentalData Component: Renders a PCA plot for experimental data.
 * 
 * @param {object} props - The component props.
 * @param {Array} props.data - The dataset used for PCA and plotting.
 * @param {string} props.visibilityMode - Mode used for determining marker colors in the plot.
 */
const PCAExperimentalData = (props) => {
    const { data, visibilityMode } = props;
    const [plotData, setPlotData] = useState([]); // State for storing plot data
    const [transformedData, setTransformedData] = useState(null); // Store transformed PCA data
    const { load, loading } = useLoading(); // Custom hook for handling loading state
    const [yAxisTitle, setYAxisTitle] = useState('PC2'); // State variable to track y-axis title
    const [yAxisValue, setYAxisValue] = useState(1); // State variable to track y-axis index

    /**
     * Effect hook for loading data when component mounts or data changes.
     */
    useEffect(() => {
        load(data);
    }, [load, data]);

    /**
     * Effect hook for performing PCA transformation and handling missing values.
     */
    useEffect(() => {
        if (!loading) {
            // Prepare feature matrix from data
            const features = data.map(d => [
                d.asm, d.aspect_rat, d.blue_mean, d.blue_mode, d.blue_std, d.circ_elon, d.circ_rect,
                d.circularity_cioni, d.circularity_dellino, d.comp_elon, d.compactness, d.contrast,
                d.convexity, d.correlation, d.dissimilarity, d.eccentricity_ellipse, d.eccentricity_moments,
                d.elongation, d.energy, d.green_mean, d.green_mode, d.green_std, d.homogeneity, d.hue_mean,
                d.hue_mode, d.hue_std, d.rect_comp, d.rectangularity, d.red_mean, d.red_mode, d.red_std,
                d.roundness, d.saturation_mean, d.saturation_mode, d.saturation_std, d.solidity, d.value_mean,
                d.value_mode, d.value_std
            ]);

            // Handle missing or non-numeric values by replacing them with 0
            for (let i = 0; i < features.length; i++) {
                for (let j = 0; j < features[i].length; j++) {
                    if (isNaN(features[i][j]) || features[i][j] === null || features[i][j] === undefined) {
                        features[i][j] = 0;
                    }
                }
            }

            // Perform PCA transformation
            const pca = new PCA(features);
            const newTransformedData = pca.predict(features);
            setTransformedData(newTransformedData); // Store transformed data
        }
    }, [data, loading]);

    /**
     * Effect hook for updating plotData when transformedData or other dependencies change.
     */
    useEffect(() => {
        if (transformedData && data) {
            // Map eruptive styles to colors
            const types = data.map(d => d.eruptive_style);
            const colors = types.map(type => constants.visibilityColors[visibilityMode][type]);

            // Create plot data
            const plotData = [{
                type: 'scatter',
                mode: 'markers',
                text: types,
                x: transformedData.data.map(d => d[0]), // PC1
                y: transformedData.data.map(d => d[yAxisValue]), // Selected PC (PC2 or PC3)
                marker: { color: colors, size: 5 },
                name: '',
                hovertemplate:
                    "<b>%{text}</b><br><br>" +
                    "PC1: %{x}<br>" +
                    `${yAxisTitle}: %{y}<br>`
            }];
            setPlotData(plotData); // Update plot data state
        }
    }, [transformedData, data, yAxisValue, yAxisTitle, visibilityMode]);

    /**
     * Handler for toggling the y-axis title between PC2 and PC3.
     */
    const handleYAxisTitleChange = () => {
        setYAxisTitle(yAxisTitle === 'PC2' ? 'PC3' : 'PC2');
        setYAxisValue(yAxisValue === 1 ? 2 : 1);
    };

    if (loading) {
        return (
            <div>
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
        ); // Render loading indicator while data is being fetched
    }

    return (
        <Plot
            data={plotData}
            layout={{
                title: 'PCA of juvenile particles <br> by eruptive style',
                xaxis: { title: 'PC1' },
                yaxis: { title: yAxisTitle },
                width: 350,
                height: 350,
                paper_bgcolor: '#e9e9e9f7',
                plot_bgcolor: '#e9e9e9f7',
            }}
            onClick={handleYAxisTitleChange} // Handle click event to toggle y-axis title
        />
    );
}

export default PCAExperimentalData;