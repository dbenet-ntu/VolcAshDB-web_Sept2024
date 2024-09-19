import { makeStyles } from '@material-ui/core/styles';

/**
 * useStyles: Defines custom styles for the CatalogPage component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styling.
 * 
 * @param {object} theme - The Material-UI theme object for responsive design.
 * @returns {object} - The styles object to be used in the CatalogPage component.
 */
export const useStyles = makeStyles((theme) => ({
    /**
     * SearchContainer style: Styles the container for the search page.
     * 
     * @property {string} backgroundColor - Sets the background color to white.
     * @property {string} width - Ensures the container takes up full width.
     * @property {string} position - Sets the position to absolute.
     * @property {string} display - Uses flexbox for layout.
     * @property {string} alignContent - Aligns the content centrally.
     * @property {string} flexDirection - Aligns child elements in a column.
     * @property {string} alignItems - Centers items horizontally.
     */
    SearchContainer: {
        backgroundColor: "white",
        width: "100%",
        position: "absolute",
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },

    /**
     * SearchTitle style: Styles the title of the search section.
     * 
     * @property {string} fontWeight - Sets the font weight to bold.
     * @property {string} color - Sets the text color to a dark gray.
     * @property {string} marginBottom - Adds margin below the title.
     * @property {string} marginTop - Adds margin above the title.
     * @property {string} width - Ensures the title takes up full width.
     * @property {string} textAlign - Centers the text horizontally.
     * @property {object} [theme.breakpoints] - Applies responsive font sizes based on screen size.
     * @property {string} fontSize - Sets font size for various breakpoints:
     *   - `xl` and `lg`: 3rem
     *   - `md` and `sm`: 2rem
     *   - `xs`: 1rem
     */
    SearchTitle: {
        fontWeight: "bold",
        color: '#333',
        marginBottom: '1rem',
        marginTop: '1rem',
        width: "100%",
        textAlign: 'center',
        [theme.breakpoints.down('xl')]: {
            fontSize: "3rem",
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: "3rem",
        },
        [theme.breakpoints.down('md')]: {
            fontSize: "2rem",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: "2rem",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "1rem",
        },
    }
}));
