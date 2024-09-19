import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Select from "react-select";
import { useStyles } from './Tags.styles';
import axios from "axios";
import * as constants from "../../../Constants.js";
import { useSessionContext } from '../../../hooks/useSessionContext';

/**
 * Tags: A component for selecting and filtering tags using react-select.
 * Utilizes forwardRef to allow parent components to control the tag selection.
 * 
 * @param {object} props - The properties passed to the component.
 * @param {object} ref - The ref object to expose methods to parent components.
 * @returns {JSX.Element} The rendered component.
 */
const Tags = forwardRef((props, ref) => {
    const classes = useStyles(); // Hook for custom styles
    const proxy = constants.PROXY; // Proxy URL for API requests
    const tagsNamesRef = useRef(props.tags); // Reference to the tags array passed in props
    const { sessionId } = useSessionContext(); // Custom hook to get session context

    const dataTemplate = require("./Tags.json"); // Importing tag data template

    const [tagList, setTagList] = useState([]); // State for holding tags and their options
    const [selectedTags, setSelectedTags] = useState({}); // State for holding selected tags

    useEffect(() => {
        // Update tag options based on volcanoes and data template
        const volcanoNames = props.volcanoes.map(volcano => volcano.volc_name);
        dataTemplate["volcanoName"].choices = volcanoNames;

        const initialTags = Object.values(dataTemplate).map(tag => ({
            oriTag: tag.oriTag,
            options: tag.choices.map(choice => ({ 
                label: choice, 
                value: tag.oriTag === 'Grain Size' && choice.includes('-') 
                ? choice.replace('-', '') 
                : choice            
            })),
            id: tag.id,
            disabled: tag.id === 2, // Disable "Eruptions" initially
        }));

        setTagList(initialTags);
    }, [props.volcanoes, dataTemplate]);

    /**
     * handleSelectChange: Handles the change event of the select component.
     * Updates the tag list and selected tags based on the selected option.
     * 
     * @param {object} selectedOption - The selected option object from react-select.
     * @param {number} tagId - The ID of the tag being updated.
     */
    const handleSelectChange = (selectedOption, tagId) => {
        const updatedTagList = [...tagList];
        const updatedTags = [...tagsNamesRef.current];
        const newSelectedTags = { ...selectedTags };

        const tagIndex = tagId - 1;
        const selectedValue = selectedOption ? selectedOption.value : "";

        if (selectedValue === "") {
            // Remove the tag if the selected value is empty
            delete newSelectedTags[tagId];
            updatedTagList[tagIndex].currentChoice = null;

            if (tagId === 1) {
                // If volcanoName (tagId 1) is cleared, also clear eruptions (tagId 2)
                delete newSelectedTags[2];
                updatedTagList[1].options = [];
                updatedTagList[1].disabled = true; // Re-disable eruptions if needed
            }

            if (tagId === 5) {
                // If main-type (tagId 5) is cleared, also clear sub types (tagId 10,11,12,13)
                delete newSelectedTags[10]; 
                delete newSelectedTags[11]; 
                delete newSelectedTags[12]; 
                delete newSelectedTags[13]; 
                updatedTagList.forEach(tag => {
                    if ([10, 11, 12, 13].includes(tag.id)) {
                        tag.disabled = false;
                        tag.currentChoice = null;
                    }
                });
            }
        } else {
            // Update selected tags and handle logic for disabling other tags
            updatedTagList[tagIndex].currentChoice = selectedValue;
            newSelectedTags[tagId] = selectedValue;

            if (tagId === 5) { 
                const mainType = selectedValue.toLowerCase();
                switch (mainType) {
                    case "free crystal":
                        updatedTagList.forEach(tag => {
                            if (tag.id === 13) { 
                                tag.disabled = false;
                            } else if ([10, 11, 12].includes(tag.id)) { 
                                tag.disabled = true;
                            }
                        });
                        break;
                    case "altered material":
                        updatedTagList.forEach(tag => {
                            if (tag.id === 12) { 
                                tag.disabled = false;
                            } else if ([10, 11, 13].includes(tag.id)) { 
                                tag.disabled = true;
                            }
                        });
                        break;
                    case "juvenile":
                        updatedTagList.forEach(tag => {
                            if (tag.id === 10) { 
                                tag.disabled = false;
                            } else if ([11, 12, 13].includes(tag.id)) { 
                                tag.disabled = true;
                            }
                        });
                        break;
                    case "lithic":
                        updatedTagList.forEach(tag => {
                            if (tag.id === 11) { 
                                tag.disabled = false;
                            } else if ([10, 12, 13].includes(tag.id)) { 
                                tag.disabled = true;
                            }
                        });
                        break;
                    default:
                        updatedTagList.forEach(tag => {
                            tag.disabled = false;
                        });
                        break;
                }
            }
        }

        if (tagId === 1 && selectedValue) {
            // Handle volcano name selection and fetch eruptions data
            axios.post(`${proxy}/afe/getVolcano?volcano=${selectedValue}`, { sessionId })
            .then(res => {
                const eruptions = res.data.afes.map(afe => 
                    afe.afe_dateBP 
                    ? `${afe.afe_code}: ${-afe.afe_dateBP} BP` 
                    : `${afe.afe_code}: ${afe.afe_date.slice(0, 10)}`);
                updatedTagList[1].options = eruptions.length 
                    ? eruptions.map(er => ({ label: er, value: er.split(":")[0] })) 
                    : [{ label: "No Eruptions Found", value: "No Eruptions Found" }];
                updatedTagList[1].disabled = false;
                setTagList(updatedTagList);
            });
        } else if ([10, 11, 12, 13].includes(tagId)) {
            // Handle subtype selection and update the main_type tag
            updatedTagList.forEach(tag => {
                if ([10, 11, 12, 13].includes(tag.id)) {
                    if (tag.id === tagId) {
                        tag.disabled = false;
                    } else {
                        tag.disabled = true;
                    }
                }
            });

            switch (tagId) {
                case 10: // Juvenile Type
                    newSelectedTags[5] = "juvenile";
                    break;
                case 11: // Lithic Type
                    newSelectedTags[5] = "lithic";
                    break;
                case 12: // Altered Material Type
                    newSelectedTags[5] = "altered material";
                    break;
                case 13: // Free Crystal Type
                    newSelectedTags[5] = "free crystal";
                    break;
                default:
                    break;
            }
        }

        setTagList(updatedTagList);
        setSelectedTags(newSelectedTags);
        props.setSelectedTags(Object.values(newSelectedTags)); // Update parent component with selected tags
        props.setTags(updatedTags.filter(tag => !Object.values(newSelectedTags).includes(tag)));
    };

    // Expose handleSelectChange method to parent components via ref
    useImperativeHandle(ref, () => ({
        handleSelectChange: (tag, id) => {
            handleSelectChange(tag, id);
        }
    }));

    return (
        <div className={classes.tabs}>
            {tagList.map(tag => (
                <div key={tag.id}>
                    <Select
                        className={classes.select}
                        options={tag.options}
                        placeholder={tag.oriTag}
                        isDisabled={tag.disabled}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, tag.id)}
                        value={tag.options.find(option => option.value === selectedTags[tag.id]) || null}
                        isClearable
                    />
                </div>
            ))}
        </div>
    );
});

export default Tags;
