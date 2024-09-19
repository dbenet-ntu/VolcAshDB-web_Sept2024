import Tags from '../Tags/Tags'
import { TagSelectorStyles } from './TagSelector.styles'

/**
 * TagSelector Component: Renders a tag selection interface.
 * 
 * @param {Array<string>} selectedTags - The currently selected tags.
 * @param {function} setSelectedTags - Function to update the selected tags.
 * @param {object} tagsRef - Ref object for accessing the Tags component.
 * @param {Array<object>} volcanoes - Array of volcano data objects.
 * @param {Array<object>} values_tags - Array of value-tag mappings.
 * 
 * @returns {JSX.Element} The rendered TagSelector component.
 */
const TagSelector = ({ selectedTags, setSelectedTags, tagsRef, volcanoes, values_tags }) => {
    // Use the custom styles for the TagSelector component
    const classes = TagSelectorStyles();

    // Array of predefined tags for selection
    const originalTags = [
        "Volcano Name",
        "Eruptions",
        "Eruptive Style",
        "Grain Size",
        "Main Type",
        "Shape",
        "Crystallinity",
        "Color",
        "Hydrothermal Alteration Degree",
        "Juvenile Type",
        "Lithic Type",
        "Altered Material Type",
        "Free Crystal Type"
    ];

    return (
        <div className={classes.SelectBox}>
            {/* Render the Tags component with the necessary props */}
            <Tags 
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                tags={originalTags}
                setTags={() => {}}
                ref={tagsRef}
                volcanoes={volcanoes}
                values_tags={values_tags}
            />
        </div>
    )
}

export default TagSelector
