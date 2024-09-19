import { makeStyles } from '@material-ui/core/styles';

/**
 * SearchBarStyle: Custom styles for the SearchBar component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styles.
 * 
 * @param {object} theme - The Material-UI theme object.
 * @returns {object} The styles object.
 */
export const SearchBarStyle = makeStyles((theme) => ({
    /**
     * Style for the container of the search box.
     * 
     * @property {string} width - Full width of the container.
     * @property {string} display - Use flexbox for layout.
     * @property {string} alignItems - Center align items vertically.
     * @property {string} justifyContent - Space items evenly within the container.
     * @property {string} flexWrap - Allow items to wrap to the next line for responsiveness.
     */
    SearchBoxContainer: {
        width: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },

    /**
     * Styles for the switch component.
     * 
     * @property {object} 'react-switch-handle' - Override default handle transform position.
     * @property {string} transform - Position the handle.
     * @property {object} '& .react-switch-handle' - Remove box shadow from the switch handle.
     * @property {string} boxShadow - Remove box shadow.
     * @property {object} '& .react-switch-bg div' - Set fixed width for the inner div of the switch background.
     * @property {string} width - Set width of the inner div.
     */
    switch: {
        'react-switch-handle': {
            transform: { translateX: "122px" },
        },
        '& .react-switch-handle': {
            boxShadow: 'none !important',
        },
        '& .react-switch-bg div': {
            width: '130px !important',
        },
    },

    /**
     * Styles for the search box itself.
     * 
     * @property {string} alignContent - Center align content within the box.
     * @property {string} padding - Padding inside the search box.
     * @property {string} margin - Vertical margin.
     * @property {string} display - Block display type.
     * @property {string} border - Border with color and width.
     * @property {string} borderRadius - Rounded corners.
     * @property {string} boxSizing - Include padding and border in element's total width and height.
     * @property {object} [theme.breakpoints.down('xl')] - Responsive styles for extra-large screens.
     * @property {string} width - Adjust width for extra-large screens.
     * @property {string} fontSize - Larger font size for emphasis.
     * @property {object} [theme.breakpoints.down('lg')] - Responsive styles for large screens.
     * @property {string} width - Adjust width for large screens.
     * @property {string} fontSize - Slightly smaller font size.
     * @property {object} [theme.breakpoints.down('md')] - Responsive styles for medium screens.
     * @property {string} width - Adjust width for medium screens.
     * @property {string} fontSize - Smaller font size.
     * @property {object} [theme.breakpoints.down('sm')] - Responsive styles for small screens.
     * @property {string} width - Adjust width for small screens.
     * @property {string} fontSize - Further reduced font size.
     * @property {object} [theme.breakpoints.down('xs')] - Responsive styles for extra-small screens.
     * @property {string} width - Consistent width for extra-small screens.
     * @property {string} fontSize - Consistent font size.
     * @property {string} padding - Reduce padding for extra-small screens.
     */
    SearchBox: {
        alignContent: "center",
        padding: "20px 30px",
        margin: "8px 0",
        display: "block",
        border: "5px solid #ccc",
        borderRadius: "20px",
        boxSizing: "border-box",

        [theme.breakpoints.down('xl')]: {
            width: '80%',
            fontSize: '2rem',
        },
        [theme.breakpoints.down('lg')]: {
            width: '80%',
            fontSize: '1.5rem',
        },
        [theme.breakpoints.down('md')]: {
            width: '70%',
            fontSize: '1rem',
        },
        [theme.breakpoints.down('sm')]: {
            width: '60%',
            fontSize: '0.8rem',
        },
        [theme.breakpoints.down('xs')]: {
            width: '60%',
            fontSize: '0.8rem',
            padding: "10px 15px",
        }
    },

    /**
     * Styles for the icon button positioned in the top-right corner.
     * 
     * @property {string} position - Absolute positioning.
     * @property {string} right - Align to the right.
     * @property {string} top - Align to the top.
     */
    iconbutton: {
        position: "absolute",
        right: 0,
        top: 0,
    }
}));
