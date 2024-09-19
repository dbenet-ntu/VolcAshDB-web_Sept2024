import { makeStyles } from "@material-ui/core/styles";

/**
 * AuthenticationStyles: Custom styles for authentication-related components.
 * Utilizes Material-UI's `makeStyles` to create a hook for styles.
 * 
 * @param {object} theme - The Material-UI theme object.
 * @returns {object} The styles object.
 */
export const AuthenticationStyles = makeStyles((theme) => ({
    /**
     * Container for centering the form on the page.
     * 
     * @property {string} marginTop - Creates space between the introductory text and the form.
     * @property {string} display - Uses flexbox for layout.
     * @property {string} justifyContent - Centers the form horizontally.
     */
    Container: {
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
    },
    
    /**
     * Style for the form container.
     * 
     * @property {string} display - Uses flexbox for layout.
     * @property {string} flexDirection - Stacks children vertically.
     * @property {string} alignItems - Centers items horizontally.
     * @property {string} backgroundColor - White background for the form.
     * @property {string} borderRadius - Rounded corners.
     * @property {string} boxShadow - Subtle shadow for depth.
     * @property {string} padding - Space inside the form.
     * @property {string} width - Fixed width for the form.
     * @property {object} [theme.breakpoints.down('xs')] - Responsive width for smaller screens.
     * @property {string} width - Decrease width for the form.
     */
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        width: "400px",
        [theme.breakpoints.down('xs')]: {
            width: "300px",
        },
    },

    /**
     * Style for the form header.
     * 
     * @property {string} fontWeight - Bold text for emphasis.
     * @property {string} marginBottom - Space below the header.
     */
    h3: {
        fontWeight: "bold",
        marginBottom: "20px",
    },

    /**
     * Style for form content areas.
     * 
     * @property {string} width - Full width of the form container.
     * @property {string} textAlign - Aligns form content to the left.
     * @property {string} display - Uses flexbox for layout.
     * @property {string} justifyContent - Space between label and input.
     * @property {string} alignItems - Centers items vertically.
     * @property {string} marginBottom - Space below each content block.
     */
    formContent: {
        width: "100%",
        textAlign: "left",
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: '10px',
    },

    /**
     * Style for input fields.
     * 
     * @property {string} border - Light gray border.
     * @property {string} borderRadius - Rounded corners.
     * @property {string} padding - Padding inside the input.
     * @property {string} marginLeft - Space between the label and the input.
     * @property {string} width - Full width of the container.
     */
    input: {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        marginLeft: "15px",
        width: "100%",
    },

    /**
     * Style for password input fields (same as general input).
     * 
     * @property {string} border - Light gray border.
     * @property {string} borderRadius - Rounded corners.
     * @property {string} padding - Padding inside the input.
     * @property {string} width - Full width of the container.
     */
    password: {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        width: "100%",
    },

    /**
     * Style for icons, e.g., visibility toggle icons.
     * 
     * @property {string} cursor - Pointer cursor on hover.
     * @property {string} marginLeft - Space to the left of the icon.
     */
    icon: {
        cursor: 'pointer',
        marginLeft: theme.spacing(1),
    },

    /**
     * Style for buttons.
     * 
     * @property {string} backgroundColor - Primary button color.
     * @property {string} color - Button text color.
     * @property {string} marginTop - Space above the button.
     * @property {string} padding - Padding inside the button.
     * @property {string} alignSelf - Centers the button horizontally.
     * @property {string} borderRadius - Rounded corners.
     * @property {string} transition - Smooth transition for background color on hover.
     * @property {object} "&:hover" - Darker color on hover.
     * @property {string} backgroundColor - Change background colore for hover state.
     * @property {string} border - Removes default border.
     */
    button: {
        backgroundColor: "#3f51b5",
        color: "white",
        marginTop: "20px",
        padding: "5px 15px",
        alignSelf: "center",
        borderRadius: "5px",
        transition: "background-color 0.3s",
        "&:hover": {
            backgroundColor: "#234681",
        },
        border: 0,
    },

    /**
     * Style for error messages.
     * 
     * @property {string} marginTop - Space above the error message.
     * @property {string} color - Red text color for errors.
     * @property {string} backgroundColor - Light red background.
     * @property {string} border - Red border.
     * @property {string} padding - Padding inside the message.
     * @property {string} borderRadius - Rounded corners.
     * @property {string} textAlign - Center text horizontally.
     */
    error: {
        marginTop: "20px",
        color: "#B20E27",
        backgroundColor: "rgba(178,14,39,0.2)",
        border: "1px solid #B20E27",
        padding: "5px 15px",
        borderRadius: "5px",
        textAlign: "center",
    },

    /**
     * Style for success messages.
     * 
     * @property {string} marginTop - Space above the success message.
     * @property {string} color - Green text color for success.
     * @property {string} backgroundColor - Light green background.
     * @property {string} border - Green border.
     * @property {string} padding - Padding inside the message.
     * @property {string} borderRadius - Rounded corners.
     * @property {string} textAlign - Center text horizontally.
     */
    success: {
        marginTop: "20px",
        color: "#006837",
        backgroundColor: "rgba(0,104,55,0.2)",
        border: "1px solid #006837",
        padding: "5px 15px",
        borderRadius: "5px",
        textAlign: "center",
    },

    /**
     * Style for forgot password link.
     * 
     * @property {string} paddingTop - Space above the link.
     * @property {string} textDecoration - Underline the text.
     * @property {string} color - Link color.
     */
    forgotPassword: {
        paddingTop: "10px",
        textDecoration: "underline",
        color: "#234681",
    }
}));
