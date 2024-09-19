import { makeStyles } from '@material-ui/core/styles';

/**
 * TagSelectorStyles: Defines custom styles for the TagSelector component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styling.
 * 
 * @param {object} theme - The Material-UI theme object for responsive design.
 * @returns {object} - The styles object to be used in the TagSelector component.
 */
export const TagSelectorStyles = makeStyles((theme) => ({
    /**
     * SelectBox style: Styles the container for tag selection.
     * 
     * @property {string} display - Sets the display to flex for flexible layout.
     * @property {string} flexDirection - Aligns child elements in a row.
     * @property {string} flexWrap - Allows items to wrap onto multiple lines if necessary.
     */
    SelectBox: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    }
}));
