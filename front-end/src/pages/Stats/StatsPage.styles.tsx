import { makeStyles } from '@material-ui/core/styles';

/**
 * StatsPageStyle: Defines custom styles for the StatsPage component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styling.
 * 
 * @param {object} theme - The Material-UI theme object for responsive design.
 * @returns {object} - The styles object to be used in the StatsPage component.
 */
export const StatsPageStyle = makeStyles((theme) => ({
    /**
     * ResultContainer style: Styles the main container for the stats page.
     * 
     * @property {string} backgroundColor - Sets the background color to white.
     * @property {string} height - Sets the height of the container to 1200px.
     */
    ResultContainer: {
        backgroundColor: 'white', 
        height: "1200px"
    },

    /**
     * title style: Styles the title section of the stats page.
     * 
     * @property {string} textAlign - Centers the title text.
     * @property {string} paddingTop - Adds top padding of 10px.
     * @property {string} paddingBottom - Removes bottom padding.
     */
    title: {
        textAlign: 'center',
        paddingTop: '10px',
        paddingBottom: '0px'
    },

    /**
     * ChartContainer style: Styles the container for charts and statistical data.
     * 
     * @property {string} paddingTop - Adds top padding of 50px.
     * @property {string} display - Uses flexbox layout.
     * @property {string} wrap - Ensures items wrap within the container.
     * @property {string} justifyContent - Space items evenly within the container.
     * @property {string} alignItems - Aligns items in the center.
     */
    ChartContainer: {
        paddingTop: '50px', 
        display: 'flex', 
        wrap: 'wrap', 
        justifyContent: "space-evenly",
        alignItems: 'center'
    },

    /**
     * ChartOverlay style: Styles the overlay for each chart section.
     * 
     * @property {string} color - Sets the text color to black.
     * @property {string} marginTop - Adds top margin of 20px.
     * @property {string} maxWidth - Limits the maximum width to 900px.
     * @property {string} textAlign - Centers the text within the overlay.
     * @property {string} padding - Adds padding of 1rem.
     * @property {string} backgroundColor - Sets a semi-transparent background color.
     * @property {string} borderRadius - Rounds the corners of the overlay with a radius of 5px.
     * @property {string} margin - Adds vertical margin of 1rem.
     * @property {string} boxShadow - Adds a subtle shadow for depth.
     */
    ChartOverlay: {
        color: "black", // Adjust the color to fit your design
        marginTop: "20px", // Creates space between the introductory text and the goal
        maxWidth: "900px", // Ensures the text does not stretch too wide
        textAlign: "center", // Centers the text
        padding: '1rem',
        backgroundColor: '#e9e9e9f7', // semi-transparent overlay for goal text
        borderRadius: '5px', // rounded corners for the text box
        margin: '1rem 0', // add margin top and bottom
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // subtle shadow for depth
    }
}));
