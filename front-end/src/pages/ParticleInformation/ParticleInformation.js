import React, { useState } from 'react';
import AnnotationDistribution from '../AnalyticPlots/AnnotationDistribution';
import { ParticleInformationStyle } from './ParticleInformation.style';
import { IconButton, Link } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InfoIcon from '@material-ui/icons/Info'; 

/**
 * ParticleInformation: Component that displays detailed information about particles.
 * Utilizes Material-UI and MUI components for UI elements and styling.
 * 
 * @param {object} props - The properties object.
 * @param {object} props.info - Contains various pieces of information about the particle.
 * @param {string} props.bgcolor - Background color for the AnnotationDistribution component.
 * @param {string} props.size - Size parameter for the AnnotationDistribution component.
 * @param {string} props.visibilityMode - Visibility mode for the AnnotationDistribution component.
 * @param {object} props.result - Contains distribution data for the AnnotationDistribution component.
 * @param {string} props.userRole - User role to determine visibility of certain elements.
 * @returns {JSX.Element} - The rendered ParticleInformation component.
 */
const ParticleInformation = (props) => {
    // Use styles defined in ParticleInformation.style
    const classes = ParticleInformationStyle();

    // State hooks for managing the visibility of different sections
    const [physicalCharOpen, setPhysicalCharOpen] = useState(false);
    const [particleInfOpen, setParticleInfOpen] = useState(true);
    const [metadataInfOpen, setMetadataInfOpen] = useState(true);

    /**
     * Toggles the visibility of the Metadata Information section.
     */
    const toggleMetadataInf = () => {
        setMetadataInfOpen(!metadataInfOpen);
    };

    /**
     * Toggles the visibility of the Particle Information section.
     */
    const toggleParticleInf = () => {
        setParticleInfOpen(!particleInfOpen);
    };

    /**
     * Toggles the visibility of the Physical Characteristics section.
     */
    const togglePhysicalChar = () => {
        setPhysicalCharOpen(!physicalCharOpen);
    };

    return (
        <div>
            {/* Metadata Information section */}
            <div className={classes.information}>
                <IconButton onClick={toggleMetadataInf}>
                    {metadataInfOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
                <h3 className={classes.h3information}>Metadata</h3>
            </div>

            {/* Conditionally rendered Metadata Information */}
            {metadataInfOpen && (
                <div>
                    <p>
                        <span className={classes.span}>id: </span> 
                        {props.info.id}
                    </p>

                    {props.info.index && 
                        <p>
                            <span className={classes.span}>index: </span> 
                            {props.info.index}
                        </p>
                    }
                    <p>
                        <span className={classes.span}>volcano name: </span> 
                        {props.info.volc_name}
                    </p>
                    
                    {props.info.afe_code && 
                        <p>
                            <span className={classes.span}>eruption code: </span> 
                            {props.info.afe_code}
                        </p>
                    }

                    {props.info.instrument && 
                        <p>
                            <span className={classes.span}>instrument: </span> {props.info.instrument}
                        </p>
                    }

                    {props.info.magnification && 
                        <p>
                            <span className={classes.span}>magnification: </span> {props.info.magnification}
                        </p>
                    }

                    {props.info.type && 
                        <p>
                            <span className={classes.span}>type: </span> {props.info.type}
                        </p>
                    }
                </div>
            )}

            {/* Particle Information section */}
            <div className={classes.information}>
                <IconButton onClick={toggleParticleInf}>
                    {particleInfOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
                <h3 className={classes.h3information}>Particle Information</h3>
            </div>

            {/* Conditionally rendered Particle Information */}
            {particleInfOpen && (
                <div>
                    {props.info.main_type && 
                        <div>
                            <p><span className={classes.span}>main type:</span></p>
                            {Object.entries(props.info.main_type).map(([key, value]) => (
                                <p key={key}><span className={classes.span_main_type}>{key}:</span> {value}%</p>
                            ))}
                        </div>
                    }

                    {props.info.sub_type && 
                        <p>
                            <span className={classes.span}>sub type: </span> {props.info.sub_type}
                        </p>
                    }

                    {props.info.color && 
                        <p>
                            <span className={classes.span}>color: </span> {props.info.color}
                        </p>
                    }

                    {props.info.luster &&
                        <p>
                            <span className={classes.span}>luster: </span> {props.info.luster}
                        </p>
                    }

                    {props.info.edge &&
                        <p>
                            <span className={classes.span}>edge: </span> {props.info.edge}
                        </p>
                    }

                    {props.info.crystallinity &&
                        <p>
                            <span className={classes.span}>crystallinity: </span> {props.info.crystallinity}
                        </p>
                    }

                    {props.info.hydro_alter_degree &&
                        <p>
                            <span className={classes.span}>hydrothermally alteration degree: </span> {props.info.hydro_alter_degree}
                        </p>
                    }

                    {props.info.shape &&
                        <p>
                            <span className={classes.span}>shape: </span> {props.info.shape}
                        </p>
                    }

                    {props.info.weathering_sign &&
                        <p>
                            <span className={classes.span}>weathering sign: </span> {props.info.weathering_sign}
                        </p>
                    }

                    {props.info.eruptive_style && 
                        <p>
                            <span className={classes.span}>eruptive style: </span> {props.info.eruptive_style}
                        </p>
                    }

                    {typeof props.info.gsLow !== "undefined" && typeof props.info.gsUp !== "undefined" &&
                        <p>
                            <span className={classes.span}>grain size: </span> phi{props.info.gsLow}-phi{props.info.gsUp}
                        </p>
                    }
                </div>
            )}

            {/* Physical Characteristics section */}
            <div className={classes.information}>
                <IconButton onClick={togglePhysicalChar}>
                    {physicalCharOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
                <h3 className={classes.h3information}>Physical characteristics</h3>
                <Tooltip disableFocusListener disableTouchListener title={
                    <React.Fragment>
                        <p>References:</p>
                        <p> 
                            <Link className={classes.Link} href="https://link.springer.com/article/10.1007/s00445-023-01695-4/tables/1">[1]</Link> 
                            Particle properties definitions
                        </p>
                        <p>
                            <Link className={classes.Link} href="https://link.springer.com/article/10.1007/s00445-023-01695-4/tables/2">[2]</Link>
                            Calculating features
                        </p>
                    </React.Fragment>
                }>
                    <InfoIcon className={classes.infoIcon} fontSize='small'></InfoIcon>
                </Tooltip>
            </div>

            {/* Conditionally rendered Physical Characteristics */}
            {physicalCharOpen && (
                <div>
                    <h3 className={classes.h3}>Shape features</h3>
                    {props.info.aspect_rat && <p><span className={classes.span}>aspect ratio: </span>{props.info.aspect_rat.toFixed(2)}</p>}
                    {props.info.circularity_cioni && <p><span className={classes.span}>circularity (Cioni): </span>{props.info.circularity_cioni.toFixed(2)}</p>}
                    {props.info.circularity_dellino && <p><span className={classes.span}>circularity (Dellino): </span>{props.info.circularity_dellino.toFixed(2)}</p>}
                    {props.info.compactness && <p><span className={classes.span}>compactness: </span>{props.info.compactness.toFixed(2)}</p>}
                    {props.info.convexity && <p><span className={classes.span}>convexity: </span>{props.info.convexity.toFixed(2)}</p>}
                    {props.info.elongation && <p><span className={classes.span}>elongation: </span>{props.info.elongation.toFixed(2)}</p>}
                    {props.info.rectangularity && <p><span className={classes.span}>rectangularity: </span>{props.info.rectangularity.toFixed(2)}</p>}
                    {props.info.roundness && <p><span className={classes.span}>roundness: </span>{props.info.roundness.toFixed(2)}</p>}
                    {props.info.solidity && <p><span className={classes.span}>solidity: </span>{props.info.solidity.toFixed(2)}</p>}

                    <h3 className={classes.h3}>Textural features</h3>
                    {props.info.asm && <p><span className={classes.span}>asm: </span>{props.info.asm.toFixed(2)}</p>}
                    {props.info.contrast && <p><span className={classes.span}>contrast: </span>{props.info.contrast.toFixed(2)}</p>}
                    {props.info.correlation && <p><span className={classes.span}>correlation: </span>{props.info.correlation.toFixed(2)}</p>}
                    {props.info.dissimilarity && <p><span className={classes.span}>dissimilarity: </span>{props.info.dissimilarity.toFixed(2)}</p>}
                    {props.info.energy && <p><span className={classes.span}>energy: </span>{props.info.energy.toFixed(2)}</p>}
                    {props.info.homogeneity && <p><span className={classes.span}>homogeneity: </span>{props.info.homogeneity.toFixed(2)}</p>}

                    <h3 className={classes.h3}>Color features</h3>
                    {props.info.blue_mean && <p><span className={classes.span}>blue mean: </span>{props.info.blue_mean.toFixed(2)}</p>}
                    {props.info.blue_mode && <p><span className={classes.span}>blue mode: </span>{props.info.blue_mode.toFixed(2)}</p>}
                    {props.info.blue_std && <p><span className={classes.span}>blue std: </span>{props.info.blue_std.toFixed(2)}</p>}
                    {props.info.green_mean && <p><span className={classes.span}>green mean: </span>{props.info.green_mean.toFixed(2)}</p>}
                    {props.info.green_mode && <p><span className={classes.span}>green mode: </span>{props.info.green_mode.toFixed(2)}</p>}
                    {props.info.green_std && <p><span className={classes.span}>green std: </span>{props.info.green_std.toFixed(2)}</p>}
                    {props.info.hue_mean && <p><span className={classes.span}>hue mean: </span>{props.info.hue_mean.toFixed(2)}</p>}
                    {props.info.hue_mode && <p><span className={classes.span}>hue mode: </span>{props.info.hue_mode.toFixed(2)}</p>}
                    {props.info.hue_std && <p><span className={classes.span}>hue std: </span>{props.info.hue_std.toFixed(2)}</p>}
                    {props.info.red_mean && <p><span className={classes.span}>red mean: </span>{props.info.red_mean.toFixed(2)}</p>}
                    {props.info.red_mode && <p><span className={classes.span}>red mode: </span>{props.info.red_mode.toFixed(2)}</p>}
                    {props.info.red_std && <p><span className={classes.span}>red std: </span>{props.info.red_std.toFixed(2)}</p>}
                    {props.info.saturation_mean && <p><span className={classes.span}>saturation mean: </span>{props.info.saturation_mean.toFixed(2)}</p>}
                    {props.info.saturation_mode && <p><span className={classes.span}>saturation mode: </span>{props.info.saturation_mode.toFixed(2)}</p>}
                    {props.info.saturation_std && <p><span className={classes.span}>saturation std: </span>{props.info.saturation_std.toFixed(2)}</p>}
                    {props.info.value_mean && <p><span className={classes.span}>value mean: </span>{props.info.value_mean.toFixed(2)}</p>}
                    {props.info.value_mode && <p><span className={classes.span}>value mode: </span>{props.info.value_mode.toFixed(2)}</p>}
                    {props.info.value_std && <p><span className={classes.span}>value std: </span>{props.info.value_std.toFixed(2)}</p>}
                
                </div>
            )}  

            {/* Conditionally rendered AnnotationDistribution component */}
            {props.userRole === 'team member' && props.result.distribution.length > 0 && (
                <AnnotationDistribution bgcolor={props.bgcolor} size={props.size} visibilityMode={props.visibilityMode} data={props.result.distribution[0]} />
            )}
        </div>
    );
};

export default ParticleInformation;
