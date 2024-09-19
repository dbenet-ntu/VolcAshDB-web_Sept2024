import { makeStyles } from '@material-ui/core/styles';

/**
 * ResultsStyles: Custom styles for the Results component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styles.
 * 
 * @param {object} theme - The Material-UI theme object.
 * @returns {object} The styles object.
 */
export const ResultsStyles = makeStyles((theme) => ({
    /**
     * Style for section headers or titles.
     * 
     * @property {number} fontWeight - Set font weight to bold.
     * @property {string} fontSize - Larger font size for emphasis.
     * @property {string} marginBottom - Space below the title.
     * @property {string} textAlign - Center-align the text.
     */
    title: {
        fontWeight: 700,
        fontSize: '1.8rem',
        marginBottom: '20px',
        textAlign: 'center',
    },

    /**
     * Style for the container during the loading state.
     * 
     * @property {string} display - Use flexbox for layout.
     * @property {string} flexDirection - Arrange items in a row.
     * @property {string} flexWrap - Allow items to wrap to the next line.
     * @property {string} justifyContent - Center items horizontally.
     */
    loadingContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    /**
     * Style for the separator line.
     * 
     * @property {string} alignSelf - Center the separator.
     * @property {number} marginTop - Space above the separator.
     * @property {number} marginBottom - Space below the separator.
     * @property {string} marginLeft - Margin from the left edge.
     * @property {string} marginRight - Margin from the right edge.
     * @property {string} width - Width of the separator.
     * @property {string} border - Light gray border.
     */
    separator: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 50,
        marginLeft: '40%',
        marginRight: '25%',
        width: '20%',
        border: '1px solid #C0C0C0',
    },

    /**
     * Style for the no results message.
     * 
     * @property {number} marginBottom - Space below the message.
     */
    noResults: {
        marginBottom: 10,
    },

    /**
     * Style for the suggested search link.
     * 
     * @property {string} textDecoration - Underline the text.
     * @property {string} color - Blue color for the link.
     * @property {string} cursor - Pointer cursor on hover.
     */
    suggestLink: {
        textDecoration: "underline",
        color: "#1890ff",
        cursor: "pointer",
    },

    /**
     * Style for the search bar separator.
     * 
     * @property {string} margin - Center the separator.
     * @property {string} width - Width of the separator.
     * @property {string} border - Light gray border.
     * @property {string} marginBottom - Space below the separator.
     */
    separatorSearchBar: {
        margin: "auto",
        width: "50%",
        border: "1px solid #C0C0C0",
        marginBottom: "20px",
    },

    /**
     * Container style for result items.
     * 
     * @property {string} display - Use flexbox for layout.
     * @property {string} flexDirection - Arrange items in a row.
     * @property {string} flexWrap - Allow items to wrap to the next line.
     * @property {string} justifyContent - Center items horizontally.
     */
    resultContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    /**
     * Style for the volcano result section.
     * 
     * @property {string} display - Use flexbox for layout.
     * @property {string} flexDirection - Arrange items in a row.
     * @property {string} flexWrap - Allow items to wrap to the next line.
     * @property {string} justifyContent - Center items horizontally.
     * @property {object} [theme.breakpoints.down('sm')] - Responsive styles for small screens.
     * @property {string} flexDirection - Stack items vertically on small screens.
     * @property {string} justifyContent - Center items vertically on small screens.
     * @property {string} display - Adjust display for small screens.
     * @property {object} [theme.breakpoints.down('xs')] - Responsive styles for extra-small screens.
     * @property {string} flexDirection - Stack items vertically on extra-small screens.
     * @property {string} justifyContent - Center items vertically on extra-small screens.
     * @property {string} width - Fixed width for extra-small screens.
     * @property {string} display - Adjust display for extra-small screens.
     */
    ResultVolcano: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            display: 'contents'
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            width: "300px",
            display: 'contents'
        }
    },

    /**
     * Style for the volcano timeline section.
     * 
     * @property {string} display - Use flexbox for layout.
     * @property {string} justifyContent - Center items horizontally.
     * @property {object} [theme.breakpoints.down('xs')] - Responsive styles for extra-small screens.
     * @property {string} display - Maintain flex display on extra-small screens.
     * @property {string} justifyContent - Reset justify-content for extra-small screens.
     */
    VolcanoTimeLine: {
        display: 'flex', 
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'flex', 
            justifyContent: 'unset',
        }
    },
}));
