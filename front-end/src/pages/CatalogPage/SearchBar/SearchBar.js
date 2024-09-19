import { useState, useEffect } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { SearchBarStyle } from './SearchBar.styles'; // Assuming you have a styles file
import Switch from 'react-switch';  // Import the Switch component from react-switch

const animatedComponents = makeAnimated();

const customStyles = {
    container: (provided) => ({
        ...provided,
        width: '80%', // Set the desired width of the container
    }),
    menu: (provided) => ({
        ...provided,
        width: '80%', // Ensure the menu width matches the container width
    })
};

/**
 * SearchBar: Component for selecting tags and toggling data types.
 * 
 * @param {string} searchTerm - Current search term.
 * @param {function} setSearchTerm - Function to update the search term.
 * @param {function} handleSubmit - Function to handle form submission.
 * @param {array} volcanoes - Array of volcano objects for search options.
 * @param {boolean} displayExperimentalData - Toggle state for experimental data.
 * @param {function} setDisplayExperimentalData - Function to update experimental data toggle state.
 * @param {array} selectedTags - Array of selected tags.
 * @param {function} setSelectedTags - Function to update selected tags.
 * @param {object} tagsRef - Reference to tag selector component.
 */
const SearchBar = ({ 
    searchTerm, 
    setSearchTerm, 
    handleSubmit, 
    volcanoes, 
    displayExperimentalData, 
    setDisplayExperimentalData, 
    selectedTags, 
    setSelectedTags, 
    tagsRef 
}) => {
    const classes = SearchBarStyle(); // Custom styles for the search bar
    
    const dataTemplate = require("../Tags/Tags.json"); // Import data template
    
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Custom icon for switch component
    const CustomIcon = ({ text }) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            fontSize: 12,
            color: 'white',
            paddingRight: 2,
            paddingLeft: 2,
            paddingTop: 1,
        }}>
            {text}
        </div>
    );

    // Toggle between experimental and natural data
    const handleDataTypeToggleChange = (checked) => {
        setDisplayExperimentalData(checked);
        const updatedTags = selectedTags.filter(tag => tag !== "Volcano Name");
        setSelectedTags(updatedTags);
        if (tagsRef.current) {
            tagsRef.current.handleSelectChange(null, 1);  // Clear "Volcano Name" in the TagSelector
        }
    };
    
    useEffect(() => {
        // Extract volcano names from the volcanoes array
        const volcanoNames = volcanoes.map(volcano => volcano.volc_name);
        dataTemplate["volcanoName"].choices = volcanoNames;
    
        // Map dataTemplate to options for the Select component
        const initialOptions = Object.values(dataTemplate).map(tag => ({
            oriTag: tag.oriTag,
            options: tag.choices.map(choice => ({ 
                label: choice, 
                value: tag.oriTag === 'Grain Size' && choice.includes('-') 
                ? choice.replace('-', '') 
                : choice            
            })),
            id: tag.id,
            disabled: tag.id === 2,
        }));
    
        setOptions(initialOptions.flatMap(tag => tag.options)); // Flatten and set options
    }, [volcanoes, dataTemplate]);
    
    // Handle selection changes in the Select component
    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        setSearchTerm(selectedOptions.map(option => option.value)); // Update search term based on selected options
    };
    
    // Handle Enter key press to submit search
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(searchTerm);
        }
    };
    
    return (
        <div className={classes.SearchBoxContainer}>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                value={selectedOptions}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                options={options}
                placeholder="Search by Volcano Name, Particle Type, etc."
                styles={customStyles}
            />
            <div style={{ textAlign: 'center' }}>
                <Switch
                    className={classes.switch}
                    onChange={handleDataTypeToggleChange}
                    checked={displayExperimentalData}
                    onColor="#ff9900" // Color when switch is on
                    offColor="#006837" // Color when switch is off
                    height={40} // Height of the switch
                    width={200}  // Width of the switch
                    handleDiameter={36} // Diameter of the switch handle
                    checkedIcon={<CustomIcon text="Experimental Data" />} // Icon when switch is on
                    uncheckedIcon={<CustomIcon text="Natural Data" />} // Icon when switch is off
                />
            </div>
        </div>
    );
};

export default SearchBar;
