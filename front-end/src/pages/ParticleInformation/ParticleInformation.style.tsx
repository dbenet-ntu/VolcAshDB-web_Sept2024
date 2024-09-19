import { makeStyles } from '@material-ui/core/styles';

/**
 * ParticleInformationStyle: Defines custom styles for the ParticleInformation component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styling.
 * 
 * @returns {object} - The styles object to be used in the ParticleInformation component.
 */
export const ParticleInformationStyle = makeStyles(() => ({
    /**
     * h3 style: Styles for all h3 headings.
     * 
     * @property {number} fontWeight - Sets the font weight to 700 for bold text.
     */
    h3: {
        fontWeight: 700,
    },

    /**
     * span style: Styles for span elements inside content sections.
     * 
     * @property {number} fontWeight - Sets the font weight to 700 for bold text.
     * @property {string} marginLeft - Adds 10px of margin to the left of the span.
     */
    span: {
        fontWeight: 700,
        marginLeft: "10px",
    },

    /**
     * span_main_type style: Styles for spans in the main_type section.
     * 
     * @property {number} fontWeight - Sets the font weight to 700 for bold text.
     * @property {string} marginLeft - Adds 25px of margin to the left of the span for indentation.
     */
    span_main_type: {
        fontWeight: 700,
        marginLeft: "25px",
    },

    /**
     * information style: Styles for the container of information headers.
     * 
     * @property {string} display - Sets the display to flex for horizontal alignment.
     * @property {string} alignItems - Vertically aligns child elements to the center.
     * @property {string} marginBottom - Adds 10px of bottom margin for spacing.
     */
    information: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },

    /**
     * h3information style: Styles for the h3 element in the information header.
     * 
     * @property {number} fontWeight - Sets the font weight to 700 for bold text.
     * @property {number} marginBottom - Removes the bottom margin for tight spacing.
     */
    h3information: {
        fontWeight: 700,
        marginBottom: 0,
    },

    /**
     * infoIcon style: Styles for the info icon in the tooltip.
     * 
     * @property {string} marginLeft - Adds 5px of margin to the left of the icon.
     */
    infoIcon: {
        marginLeft: "5px",
    },

    /**
     * Link style: Styles for the links inside the tooltip.
     * 
     * @property {string} marginRight - Adds 5px of margin to the right of the link for spacing.
     */
    Link: {
        marginRight: "5px",
    },
}));
