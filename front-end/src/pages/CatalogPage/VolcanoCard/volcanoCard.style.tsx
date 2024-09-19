import { makeStyles } from "@material-ui/styles";

/**
 * volcanoStyle: Defines custom styles for the VolcanoCard component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styling.
 * 
 * @returns {object} - The styles object to be used in the VolcanoCard component.
 */
export const volcanoStyle = makeStyles({
    /**
     * Global styles and animations.
     */
    '@global': {
        /**
         * Keyframes for the 'pulse' animation.
         * 
         * @property {string} 0%, 100% - Full opacity at the start and end of the animation.
         * @property {string} 50% - Half opacity at the midpoint of the animation.
         */
        "@keyframes pulse": {
            "0%, 100%": {
                opacity: 1
            },
            "50%": {
                opacity: 0.5
            }
        }
    },
    /**
     * Container style: Styles the main container of the VolcanoCard.
     * 
     * @property {string} display - Sets the display to flex for flexible layout.
     * @property {string} flexDirection - Aligns child elements in a column.
     * @property {string} width - Fixed width of the container.
     * @property {string} padding - Padding inside the container.
     * @property {string} margin - Margin around the container.
     * @property {string} backgroundColor - Background color of the container.
     * @property {string} borderRadius - Rounded corners for the container.
     * @property {string} position - Positioning context for absolute children.
     * @property {string} overflow - Hides overflowing content.
     * @property {object} '&:hover' - Styles applied when hovering over the container.
     *     @property {object} "& $cardOver" - Transforms the overlay when the container is hovered.
     */
    container: {
        display: "flex",
        flexDirection: "column",
        width: "200px",
        padding: "5px",
        margin: "5px 5px",
        backgroundColor: "#0c4aad",
        borderRadius: "10px",
        position: "relative",
        overflow: "hidden",
        '&:hover': {
            "& $cardOver": {
                transform: "translateY(0%)"
            }
        }
    },
    /**
     * Styles applied when the VolcanoCard has an opinion.
     * 
     * @property {string} backgroundColor - Sets the background color to green for particles with opinions.
     */
    hasOpinion: {
        backgroundColor: 'green',
    },
    /**
     * Poster style: Styles the poster image within the VolcanoCard.
     * 
     * @property {string} borderRadius - Rounded corners for the image.
     */
    poster: {
        borderRadius: "10px",
    },
    /**
     * Name style: Styles the name text inside the VolcanoCard.
     * 
     * @property {string} color - Sets the text color to white.
     * @property {string} width - Sets the width to 100% of the container.
     * @property {string} textAlign - Center aligns the text.
     * @property {string} fontSize - Sets the font size of the name.
     * @property {number} fontWeight - Sets the font weight for emphasis.
     * @property {string} padding - Adds vertical padding around the name.
     */
    name: {
        color: "white",
        width: "100%",
        textAlign: "center",
        fontSize: "17px",
        fontWeight: 600,
        padding: "8px 0",
    },
    /**
     * Card overlay style: Styles the overlay that appears when the card is hovered over.
     * 
     * @property {string} backgroundColor - Background color of the overlay.
     * @property {string} opacity - Sets the transparency level of the overlay.
     * @property {string} position - Absolute positioning within the container.
     * @property {string} padding - Padding inside the overlay.
     * @property {string} bottom - Positioned at the bottom of the container.
     * @property {string} left - Positioned to the left of the container.
     * @property {string} right - Positioned to the right of the container.
     * @property {string} transform - Initially hides the overlay by translating it down.
     * @property {string} maxHeight - Limits the maximum height of the overlay.
     * @property {string} overflowY - Adds vertical scroll if content overflows.
     * @property {string} transition - Smooth transition effect for the overlay.
     */
    cardOver: {
        backgroundColor: "#C0C0C0",
        opacity: "0.85",
        position: "absolute",
        padding: "1rem",
        bottom: "0",
        left: "0",
        right: "0",
        transform: "translateY(100%)",
        maxHeight: "100%",
        overflowY: "scroll",
        transition: "transform 0.3s ease-in-out",
    }
});