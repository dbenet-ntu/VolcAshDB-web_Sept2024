import { makeStyles } from '@material-ui/core/styles';

/**
 * LegalStyle: A set of custom styles for the Legal component.
 * It uses Material-UI's `makeStyles` for theming and responsive design.
 * 
 * @returns {object} - The styles to be applied to the Legal components.
 */
export const LegalStyle = makeStyles((theme) => ({
    /**
     * Container style: Styles the main container of the Legal component.
     * 
     * @property {string} backgroundColor - Sets background color to white.
     * @property {string} color - Sets text color to black.
     * @property {string} textAlign - Aligns text to the left.
     * @property {string} padding - Adds padding around the content.
     * @property {string} display - Uses flexbox for layout.
     * @property {string} justifyContent - Centers content horizontally.
     * @property {object} [theme.breakpoints.down('md')] - Adjusts font size for medium screens and below.
     * @property {string} fontSize - Set font size.
     * @property {object} [theme.breakpoints.down('sm')] - Adjusts font size for small screens and below.
     * @property {string} fontSize - Maintain the same font size.
     * @property {object} [theme.breakpoints.down('xs')] - Adjusts font size for extra small screens.
     * @property {string} fontSize - Decrease font size.
     * @property {string} borderRadius - Adds rounded corners to the container.
     */
    Container: {
        backgroundColor: "white", // Sets background color to white
        color: "black",
        textAlign: "left",
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            fontSize: "1rem",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "1rem",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "0.8rem",
        },
        borderRadius: '5px',
    },
    
    /**
     * LegalContainer style: Sets width of the container holding legal information.
     * 
     * @property {string} width - Sets width to 70% of the parent container.
     */
    LegalContainer: {
        width: '70%',
    },
    
    /**
     * title style: Styles for titles within the Legal component.
     * 
     * @property {string} textAlign - Centers the title text.
     * @property {string} marginBottom - Adds space below the title.
     * @property {string} padding - Adds padding around the title.
     */
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        padding: '10px',
    },
    
    /**
     * text style: Styles for the main text content in the Legal component.
     * 
     * @property {string} color - Sets text color to black.
     * @property {string} marginTop - Adds space above the text content.
     * @property {string} padding - Adds padding inside the text container.
     * @property {string} backgroundColor - Sets a semi-transparent background.
     * @property {string} borderRadius - Adds rounded corners to the text container.
     * @property {string} margin - Adds vertical margin to separate text blocks.
     */
    text: {
        color: "black",
        marginTop: "20px",
        padding: '1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '5px',
        margin: '1rem 0',
    },
    
    /**
     * Typography style: Adds left margin to Typography components.
     * 
     * @property {string} marginLeft - Adds left margin to Typography components.
     */
    Typography: {
        marginLeft: '50px',
    },
    
    /**
     * li style: Styles list items within the Legal component.
     * 
     * @property {string} marginBottom - Adds space below each list item.
     */
    li: {
        marginBottom: '10px',
    }
}));
