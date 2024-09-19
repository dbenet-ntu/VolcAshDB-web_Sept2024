import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import RiseLoader from "react-spinners/RiseLoader";
import { useLoading } from '../../hooks/useLoading';
import * as constants from "../../Constants"

const { PCA } = require('ml-pca');

const PCAAllParticles2d = (props) => {
	const { data, visibilityMode } = props
	const [plotData, setPlotData] = useState([]);
	const [transformedData, setTransformedData] = useState(null); // Store transformed data
	const {load, loading} = useLoading()
	const [selectedParticles, setSelectedParticles] = useState(null);
	const [selectedEruptiveStyle, setSelectedEruptiveStyle] = useState("All"); // Store selected activity type
	const [yAxisTitle, setYAxisTitle] = useState('PC2'); // State variable to track y-axis title
	const [yAxisValue, setYAxisValue] = useState(1); // State variable to track y-axis title

	useEffect(() => {
        load(data)
    }, [load, data])
	

	useEffect(() => {
		if (selectedEruptiveStyle !== "" && !loading) { // Load data only if transformedData is not available
			const selectedParticles = selectedEruptiveStyle === "All" ? data : data.filter(d => d.eruptive_style === selectedEruptiveStyle); // Filter particles based on selected activity type
			const features = selectedParticles.map(d => [
				d.asm,
				d.aspect_rat,
				d.blue_mean,
				d.blue_mode,
				d.blue_std,
				d.circ_elon,
				d.circ_rect,
				d.circularity_cioni,
				d.circularity_dellino,
				d.comp_elon,
				d.compactness,
				d.contrast,
				d.convexity,
				d.correlation,
				d.dissimilarity,
				d.eccentricity_ellipse,
				d.eccentricity_moments,
				d.elongation,
				d.energy,
				d.green_mean,
				d.green_mode,
				d.green_std,
				d.homogeneity,
				d.hue_mean,
				d.hue_mode,
				d.hue_std,
				d.rect_comp,
				d.rectangularity,
				d.red_mean,
				d.red_mode,
				d.red_std,
				d.roundness,
				d.saturation_mean,
				d.saturation_mode,
				d.saturation_std,
				d.solidity,
				d.value_mean,
				d.value_mode,
				d.value_std]
			);
			
			setSelectedParticles(selectedParticles);

			const pca = new PCA(features);
			const newTransformedData = pca.predict(features);
			setTransformedData(newTransformedData); // Store transformed data
		}		
	}, [selectedEruptiveStyle, data, loading]);


	useEffect(() => {

        if (transformedData && selectedParticles) { // Render plot only if transformedData is available and loading is false
			const types = selectedParticles.map(d => {
				const mainTypeEntries = Object.entries(d.main_type);
				const [maxType] = mainTypeEntries.reduce((maxEntry, currentEntry) => 
					currentEntry[1] > maxEntry[1] ? currentEntry : maxEntry
				);
				return maxType;
			});
			const colors = types.map(type => constants.visibilityColors[visibilityMode][type]); // Map types to colors using getColor function
			const plotData = [{
                type: 'scatter',
                mode: 'markers',
				text: types,
                x: transformedData.data.map(d => d[0]),
                y: transformedData.data.map(d => d[yAxisValue]),
                marker: { color: colors, size: 5 },
				name: '',
				hovertemplate:
					"<b>%{text}</b><br><br>" +
					"PC1: %{x}<br>" +
					`${yAxisTitle}: %{y}<br>`
				
            }];
            setPlotData(plotData);
        }
    }, [transformedData, selectedParticles, yAxisValue, yAxisTitle, visibilityMode]);

	const handleActivityTypeChange = (event) => {
        setSelectedEruptiveStyle(event.target.value);
    };

	const handleYAxisTitleChange = () => {
        // Update y-axis title based on current title
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
					size= {10}
					color= {"#123abc"}
					loading= {loading}
				/>
			</div>
		); // Render loading indicator while data is being fetched
    }

	return (
		<div style={{display: 'flex', wrap: 'wrap', flexDirection: 'column'}}>
			<Plot
				data={plotData}
				layout={{
					title: 'PCA of all particles',
					xaxis: { title: 'PC1' },
					yaxis: { title: yAxisTitle },
					width: 350,
                	height: 350,
					paper_bgcolor: '#e9e9e9f7', 
          			plot_bgcolor: '#e9e9e9f7',
				}}
				onClick={handleYAxisTitleChange} // Handle click event to change y-axis title
			/>
			<select style={{textAlign: 'center', width: '50%', margin: 'auto'}} value={selectedEruptiveStyle} onChange={handleActivityTypeChange}>
                <option value="">Select Eruptive Style</option>
                <option value="All">All Eruptive Style</option>
				<option value="Plinian">Plinian</option>
				<option value="Phreatic">Phreatic</option>
                <option value="Dome explosion">Dome explosion</option>
                <option value="Subplinian">Subplinian</option>
                <option value="Lava fountaining">Lava fountaining</option>
            </select>
			
		</div>
	  );
}

export default PCAAllParticles2d