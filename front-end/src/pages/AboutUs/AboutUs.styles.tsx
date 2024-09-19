import { makeStyles } from '@material-ui/core/styles';

/**
 * useStyles Hook: Defines and provides styles for the AboutUs component.
 * 
 * @param {object} theme - The Material-UI theme object for responsive design.
 * @returns {object} - The styles object for the AboutUs component.
 */
export const AboutUsStyle = makeStyles((theme) => ({
    /**
     * Styles for the main container of the AboutUs component.
     * 
     * @property {string} backgroundColor - Background color of the container.
     * @property {string} color - Text color, adjusted to fit design requirements.
     * @property {string} textAlign - Aligns text to the left.
     * @property {string} padding - Padding around the content.
     * @property {string} borderRadius - Rounded corners for the container.
     * @property {object} [theme.breakpoints.down('md')] - Responsive font size for medium screens and smaller.
     * @property {string} fontSize - Set font size.
     * @property {object} [theme.breakpoints.down('sm')] - Responsive font size for small screens and smaller.
     * @property {string} fontSize - Maintain the same font size.
     * @property {object} [theme.breakpoints.down('xs')] - Responsive font size for extra-small screens.
     * @property {string} fontSize - Decrease font size.
     */
    AboutUsContainer: {
        backgroundColor: "white",
        color: "black",
        textAlign: "left",
        padding: '1rem',
        borderRadius: '5px',
        [theme.breakpoints.down('md')]: {
            fontSize: "1rem",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "1rem",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "0.8rem",
        },
    },
    
    /**
     * Styles for the footer section within the AboutUs component.
     * 
     * @property {string} display - Flexbox layout for positioning.
     * @property {string} justifyContent - Center items horizontally.
     */
    footer: {
        display: "flex",
        justifyContent: "center",
    },
    
    /**
     * Styles for legal information links in the footer.
     * 
     * @property {string} paddingRight - Space between legal information links.
     */
    legalInformation: {
        paddingRight: "10px"
    }
}));
