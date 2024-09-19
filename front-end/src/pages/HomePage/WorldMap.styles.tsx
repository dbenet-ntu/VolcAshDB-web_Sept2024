import { makeStyles } from '@material-ui/core/styles';

/**
 * WorldMapStyle: Defines custom styles for the WorldMap component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styling.
 * 
 * @param {object} theme - The Material-UI theme object for responsive design.
 * @returns {object} - The styles object to be used in the WorldMap component.
 */
export const WorldMapStyle = makeStyles((theme) => ({
    /**
     * DownloadContainer style: Styles the container for the download button.
     * 
     * @property {string} marginTop - Adds top margin to position the container lower on the page.
     */
    DownloadContainer: {
        marginTop: '70px',
    },

    /**
     * customDownloadButton style: Styles the custom download button.
     * 
     * @property {string} cursor - Sets the cursor to pointer to indicate the button is clickable.
     * @property {string} backgroundColor - Sets the background color to white.
     * @property {string} width - Sets the width of the button.
     * @property {string} height - Sets the height of the button.
     * @property {string} display - Uses flexbox for layout to center the icon.
     * @property {string} justifyContent - Centers the content horizontally.
     * @property {string} alignItems - Centers the content vertically.
     */
    customDownloadButton: {
        cursor: 'pointer',
        backgroundColor: 'white',
        width: '34px',
        height: '34px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    /**
     * legendContainer style: Styles the container for the legend.
     * 
     * @property {string} background - Sets the background color to white.
     * @property {string} padding - Adds padding inside the container.
     * @property {string} border - Adds a border around the container.
     * @property {string} borderRadius - Rounds the corners of the container.
     * @property {string} boxShadow - Adds a subtle shadow effect for depth.
     * @property {string} margin - Adds margin around the container.
     * @property {string} fontSize - Sets the font size for the legend text.
     */
    legendContainer: {
        background: "white",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)",
        margin: "10px",
        fontSize: "14px",
    },

    /**
     * legend style: Styles the legend text.
     * 
     * @property {string} fontSize - Sets the font size for the legend text.
     */
    legend: {
        fontSize: "10px",
    },

    /**
     * legendItem style: Styles individual items in the legend.
     * 
     * @property {string} display - Uses flexbox layout.
     * @property {string} alignItems - Aligns items vertically in the center.
     */
    legendItem: {
        display: "flex",
        alignItems: "center",
    },

    /**
     * legendSpan style: Styles the text next to the legend icons.
     * 
     * @property {string} paddingLeft - Adds padding to the left of the text.
     */
    legendSpan: {
        paddingLeft: "5px",
    },

    /**
     * legendImg style: Styles the icons used in the legend.
     * 
     * @property {number} width - Sets the width of the icon.
     * @property {number} height - Sets the height of the icon.
     * @property {string} marginRight - Adds space to the right of the icon.
     * @property {string} marginBottom - Adds space below the icon.
     */
    legendImg: {
        width: 10, 
        height: 10,
        marginRight: "5px",
        marginBottom: "3px",
    }
}));
