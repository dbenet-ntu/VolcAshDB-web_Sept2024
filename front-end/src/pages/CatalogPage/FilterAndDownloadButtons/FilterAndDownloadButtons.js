import { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { FilterAndDownloadStyle } from './FilterAndDownloadButtons.styles';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as constants from '../../../Constants';
import ODbLlicense from '../../../legal/ODbL-1.0.txt';
import ccbylicense from '../../../legal/CC-BY-4.0.txt';
import openlicense from '../../../legal/Open-License-2.0.txt';

const JSZip = require("jszip");

/**
 * FilterAndDownloadButtons Component
 * Renders buttons for applying filters and downloading filtered data.
 * 
 * @param {function} filterSubmit - Function to handle filter application.
 * @param {string} searchTerm - Current search term.
 * @param {function} handleSubmit - Function to handle search term submission.
 * @param {object} searchData - Data containing particles information.
 * @param {boolean} isLoading - Flag indicating if data is being loaded.
 * @param {object} user - User object for authentication status.
 */
const FilterAndDownloadButtons = ({ filterSubmit, searchTerm, handleSubmit, searchData, isLoading, user }) => {
    const classes = FilterAndDownloadStyle();
    const [isPreparingDownload, setIsPreparingDownload] = useState(false);
    const proxy = constants.PROXY;

    // Function to flatten main_type object for CSV export
    const flattenMainType = (mainType) => {
        const flattened = {};
        for (const [key, value] of Object.entries(mainType)) {
            flattened[`Main Type ${key}`] = value || "0";
        }
        return flattened;
    };

    // Function to create an XLSX file from particle data
    const exportXLSXfile = () => {
        const trimmedParInfo = searchData.particles.map(par => {
            const path = `Particles_Image/${par.imgURL}`;
            const flattenedMainType = flattenMainType(par.main_type || {});
            const afe_date = par.afe_dateBP ? `-${par.afe_dateBP}` : par.afe_date;

            return {
                // ID
                "Image Path": path,

                // Shape Features
                "aspect_rat": par.aspect_rat,
                "circularity_cioni": par.circularity_cioni,
                "circularity_dellino": par.circularity_dellino,
                "compactness": par.compactness,
                "convexity": par.convexity,
                "elongation": par.elongation,
                "rectangularity": par.rectangularity,
                "roundness": par.roundness,
                "solidity": par.solidity,

                // Textural Features
                "asm": par.asm,
                "contrast": par.contrast,
                "correlation": par.correlation,
                "dissimilarity": par.dissimilarity,
                "energy": par.energy,
                "homogeneity": par.homogeneity,

                // Color Features
                "blue_mean": par.blue_mean,
                "blue_std": par.blue_std,
                "blue_mode": par.blue_mode,
                "green_mean": par.green_mean,
                "green_std": par.green_std,
                "green_mode": par.green_mode,
                "red_mean": par.red_mean,
                "red_std": par.red_std,
                "red_mode": par.red_mode,
                "hue_mean": par.hue_mean,
                "hue_std": par.hue_std,
                "hue_mode": par.hue_mode,
                "saturation_mean": par.saturation_mean,
                "saturation_std": par.saturation_std,
                "saturation_mode": par.saturation_mode,
                "value_mean": par.value_mean,
                "value_std": par.value_std,
                "value_mode": par.value_mode,

                // Volcano's metadata
                "volc_name": par.volc_name,
                "eruptive_style": par.eruptive_style,
                "volc_lat": par.volc_lat,
                "volc_lon": par.volc_lon,

                // Afe's metadata
                "afe_date": afe_date,
                "afe_lat": par.afe_lat,
                "afe_lon": par.afe_lon,
                "temperature_lower_bound": par.temperature_lower_bound,
                "temperature_upper_bound": par.temperature_upper_bound,
                "oxygen_fugacity": par.oxygen_fugacity,
                "experiment_duration": par.experiment_duration,

                // Particle's metadata
                "instrument": par.instrument,
                "magnification": par.magnification,
                "type": par.type,
                ...flattenedMainType,
                "sub_type": par.sub_type,
                "color": par.color,
                "luster": par.luster,
                "edge": par.edge,
                "crystallinity": par.crystallinity,
                "hydro_alter_degree": par.hydro_alter_degree,
                "shape": par.shape,
                "weathering_sign": par.weathering_sign,
                "gsLow": par.gsLow,
                "gsUp": par.gsUp
            };
        });

        // Define the multi-level headers for the Excel sheet
        const headers = [
            // Row 1: Main headers
            ["ID", "Particle characterization", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Volcano and Eruption context", null, null, null, "Ash-Forming Event (AFE) context", null, null, "Experimental conditions", null, null, null, "Imaging conditions", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],

            // Row 2: Section headers
            [null, "Shape Features", null, null, null, null, null, null, null, null, "Textural Features", null, null, null, null, null, "Color Features", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "Particle main type", null, null, null, null, null, null, null, null, null, null, null, null, null],

            // Row 3: Column headers
            ["Image Path", "aspect_rat", "circularity_cioni", "circularity_dellino", "compactness", "convexity", "elongation", "rectangularity", "roundness", "solidity", "asm", "contrast", "correlation", "dissimilarity", "energy", "homogeneity", "blue_mean", "blue_std", "blue_mode", "green_mean", "green_std", "green_mode", "red_mean", "red_std", "red_mode", "hue_mean", "hue_std", "hue_mode", "saturation_mean", "saturation_std", "saturation_mode", "value_mean", "value_std", "value_mode", "volc_name", "eruptive_style", "volc_lat", "volc_lon", "afe_date", "afe_lat", "afe_lon", "temperature_lower_bound", "temperature_upper_bound", "oxygen_fugacity", "experiment_duration", "instrument", "magnification", "type", "altered material", "free crystal", "juvenile", "lithic", "sub_type", "color", "luster", "edge", "crystallinity", "hydro_alter_degree", "shape", "weathering_sign", "gsLow", "gsUp"]
        ];

        // Create the worksheet and append the particle data
        const ws = XLSX.utils.aoa_to_sheet(headers);
        XLSX.utils.sheet_add_json(ws, trimmedParInfo, { skipHeader: true, origin: "A4" });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Particles");

        return XLSX.write(wb, { type: "array", bookType: "xlsx" });
    };

    // Function to handle download button click
    const handleDownloadButtonClicked = async () => {
        if (!user) {
            return;
        }

        setIsPreparingDownload(true);
        const zip_name = filterSubmit.toLowerCase().split(/[\s,]+/).join("_");
        const photoZip = new JSZip().folder(`${zip_name}.zip`);

        const parArray = searchData.particles;

        // Download and add images to the ZIP file
        for (let par of parArray) {
            const imgURL = `${proxy}/images/particles/${par.imgURL}`;
            await DownloadImgFromURL(par, imgURL, photoZip);
        }

        // Export and add the XLSX file to the ZIP
        const parInfo = exportXLSXfile();
        photoZip.file(`Particles_Info.xlsx`, parInfo);

        // Fetch and add license files to the ZIP
        const odbl_licenseResponse = await fetch(ODbLlicense);
        const odbl_licenseContent = await odbl_licenseResponse.text();
        photoZip.file('ODbL-1.0.txt', odbl_licenseContent);

        const ccby_licenseResponse = await fetch(ccbylicense);
        const ccby_licenseContent = await ccby_licenseResponse.text();
        photoZip.file('CC-BY-4.0.txt', ccby_licenseContent);

        const openlicenseResponse = await fetch(openlicense);
        const openlicenseContent = await openlicenseResponse.text();
        photoZip.file('Open-License-2.0.txt', openlicenseContent);

        // Generate and save the ZIP file
        photoZip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, `${zip_name}.zip`);
            setIsPreparingDownload(false);
        });
    };

    // Function to download image from URL and add to ZIP
    const DownloadImgFromURL = async (par, imgURL, photoZip) => {
        const response = await fetch(imgURL);
        const imageBlob = await response.blob();
        photoZip.file(`Particles_Image/${par.imgURL}`, imageBlob);
    };

    return (
        <div className={classes.FilterDownloadButtons}>
            <Button 
                className={classes.FilterButton} 
                variant='contained' 
                onClick={() => handleSubmit(searchTerm)}
            >
                Apply Filters
            </Button>
            {filterSubmit.length !== 0 && !isLoading ? (
                <span>
                    {!user ? (
                        <Button 
                            disabled={!user}
                            id="demo-positioned-button"
                            aria-controls="demo-positioned-menu"
                            aria-haspopup="true"
                            variant='contained' 
                            className={classes.DownloadButton} 
                            onClick={(event) => handleDownloadButtonClicked(event)}
                        > 
                            You have to login to download images and measured features
                        </Button>
                    ) : (
                        <Button 
                            disabled={!user}
                            id="demo-positioned-button"
                            aria-controls="demo-positioned-menu"
                            aria-haspopup="true"
                            variant='contained' 
                            className={classes.DownloadButton} 
                            onClick={(event) => handleDownloadButtonClicked(event)}
                        > 
                            Download Images and Measured Features
                        </Button>
                    )}
                    {isPreparingDownload ? (
                        <CircularProgress style={{ marginLeft: "15px", marginBottom: "-20px" }} />
                    ) : null}
                </span>
            ) : null}
        </div>
    );
};

export default FilterAndDownloadButtons;
