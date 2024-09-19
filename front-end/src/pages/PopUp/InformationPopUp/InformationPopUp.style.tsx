import { makeStyles } from '@material-ui/core/styles';

/**
 * InformationPopUpStyle: Defines custom styles for the InformationPopUp component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styling.
 * 
 * @param {object} theme - The Material-UI theme object for responsive design.
 * @returns {object} - The styles object to be used in the InformationPopUp component.
 */
export const InformationPopUpStyle = makeStyles((theme) => ({
    /**
     * InformationPopUp style: Styles the main container for the pop-up.
     * 
     * @property {string} display - Uses flexbox to lay out child elements.
     * @property {string} justifyContent - Centers the images horizontally.
     * @property {string} flexWrap - Allows the items to wrap onto multiple lines if needed.
     */
    InformationPopUp: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },

    /**
     * Image style: Styles the images within the pop-up.
     * 
     * @property {string} width - Sets the image width to 80% of its container.
     * @property {string} marginBottom - Adds a bottom margin of 150px to space out images.
     */
    Image: {
        width: "80%", 
        marginBottom: "150px"
    }
}));