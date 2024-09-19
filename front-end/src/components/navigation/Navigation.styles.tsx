import { makeStyles } from "@material-ui/core/styles";

/**
 * NavigationStyles: A set of custom styles for the navigation components.
 * It uses Material-UI's `makeStyles` for theming and responsive design.
 * 
 * @param {boolean} drawerOpen - Indicates if the drawer (sidebar) is open.
 * @returns {object} - The styles to be applied to the components.
 */
export const NavigationStyles = makeStyles((theme) => ({
    /**
     * AppBar style: Adjusts the width and margin based on the drawer state.
     * 
     * @property {function} width - Sets width to `auto` if drawer is open, otherwise full width.
     * @property {function} marginRight - Adds margin when the drawer is open.
     * @property {object} transition - Smooth transition for width and margin.
     */
    AppBar: {
        width: (drawerOpen) => (drawerOpen ? `auto` : '100%'),
        marginRight: (drawerOpen) => (drawerOpen ? 240 : 0),
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    
    /**
     * navMenu style: Makes the navigation menu a flex container.
     * 
     * @property {string} display - Sets display to flex for the menu items.
     */
    navMenu: {
        display: 'flex',
    },
    
    /**
     * navToolBar style: Ensures space between items in the toolbar.
     * 
     * @property {string} justifyContent - Aligns items with space between them.
     */
    navToolBar: {
        justifyContent: 'space-between',
    },
    
    /**
     * navLogo style: Sets the appearance of the logo, including responsive font sizes.
     * 
     * @property {string} color - Sets logo text color to white.
     * @property {string} fontSize - Default font size for the logo.
     * @property {object} [theme.breakpoints.down('sm')] - Adjusts font size for small screens.
     * @property {string} fontSize - Decrease font size of the button text.
     * @property {object} [theme.breakpoints.down('xs')] - Adjusts font size for extra small screens.
     * @property {string} fontSize - Decrease even more font size of the button text.
     * @property {string} alignItems - Aligns logo items centrally.
     * @property {string} fontWeight - Sets the font weight to bold.
     * @property {string} textDecoration - Removes underline from the logo text.
     */
    navLogo: {
        color: "white",
        fontSize: "1.5rem",
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.6rem',
        },
        alignItems: "center",
        fontWeight: "bold",
        textDecoration: "none", 
    },
    
    /**
     * header style: Sets background color and padding for the header section.
     * 
     * @property {string} background - Sets background color to blue.
     * @property {string} paddingLeft - Adds padding on the left.
     * @property {string} paddingRight - Adds padding on the right.
     */
    header: {
        background: "#0c4aad",
        paddingLeft: "1%",
        paddingRight: "1%",
    },
    
    /**
     * navBtn style: Styles the navigation buttons, including responsive padding and font sizes.
     * 
     * @property {string} minWidth - Sets minimum width of the button.
     * @property {string} borderRadius - Adds rounded corners to the button.
     * @property {string} whiteSpace - Prevents text from wrapping.
     * @property {string} padding - Adds padding inside the button.
     * @property {string} fontSize - Default font size of the button text.
     * @property {object} [theme.breakpoints.down('sm')] - Adjusts padding and font size for small screens.
     * @property {string} padding - Decrease padding inside the button.
     * @property {string} fontSize - Decrease font size of the button text.
     * @property {object} [theme.breakpoints.down('xs')] - Adjusts padding and font size for extra small screens.
     * @property {string} padding - Decrease padding inside the button.
     * @property {string} fontSize - Decrease font size of the button text.
     * @property {string} outline - Removes default outline on focus.
     * @property {string} border - Removes default border.
     * @property {string} cursor - Changes cursor to pointer on hover.
     * @property {string} transition - Smooth transition effect for hover.
     * @property {string} textDecoration - Removes underline from button text.
     * @property {object} '&:hover' - Styles for button hover state.
     * @property {object} background - Pass background color to white for hover state
     * @property {object} color - Pass text color to black for hover state
     * @property {object} color - Default white text color
     */
    navBtn: {
        minWidth: "50px",
        borderRadius: "20px",
        whiteSpace: "nowrap",
        padding: "10px 22px;",
        fontSize: "1rem",
        [theme.breakpoints.down('sm')]: {
            padding: "7px 15px;",
            fontSize: '0.6rem',
        },
        [theme.breakpoints.down('xs')]: {
            padding: "5px 5px;",
            fontSize: '0.5rem',
        },
        outline: "none",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        textDecoration: "none",
        '&:hover': {
            background: "white",
            color: "black"
        },
        color: "white"
    },
    
    /**
     * drawer style: Styles the drawer (sidebar), adjusting the width based on its state.
     * 
     * @property {number} flexShrink - Prevents the drawer from shrinking.
     * @property {string} whiteSpace - Prevents text wrapping inside the drawer.
     * @property {object} transition - Smooth width transition for the drawer.
     * @property {function} width - Adjusts width based on drawer state.
     * @property {object} '& .MuiTypography-body1' - Styles for text inside the drawer.
     * @property {string} fontSize - Set font size of the drawer text.
     * @property {object} '& .MuiList-padding' - Removes padding from list items inside the drawer.
     * @property {string} paddingTop - Remove top padding for the list.
     * @property {string} paddingBottom - Remove bottom padding for the list.
     */
    drawer: {
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        width: (drawerOpen) => (drawerOpen ? 240 : 0),
        '& .MuiTypography-body1': {
            fontSize: '0.8rem',
        },
        '& .MuiList-padding': {
            paddingTop: '0px',
            paddingBottom: '0px',
        }
    },
    
    /**
     * drawerPaper style: Sets the width of the drawer.
     * 
     * @property {number} width - Fixed width for the drawer.
     */
    drawerPaper: {
        width: 240,
    },
    
    /**
     * drawerHeader style: Aligns items in the drawer header.
     * 
     * @property {string} display - Uses flex layout for header items.
     * @property {string} alignItems - Vertically centers items.
     * @property {object} padding - Horizontal padding for the header.
     * @property {object} ...theme.mixins.toolbar - Applies default toolbar styles.
     * @property {string} justifyContent - Aligns items to the start.
     */
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
}));
