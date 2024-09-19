import { makeStyles } from '@material-ui/core/styles';

/**
 * VolcanoeTimeLineStyle: Defines custom styles for the VolcanoTimeLine component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styling.
 * 
 * @param {object} theme - The Material-UI theme object for responsive design.
 * @returns {object} - The styles object to be used in the VolcanoTimeLine component.
 */
export const VolcanoeTimeLineStyle = makeStyles((theme) => ({
    /**
     * TimeLineOverlay style: Styles the container for the timeline component.
     * 
     * @property {string} height - Set to 'auto' to maintain aspect ratio based on content.
     * @property {object} [theme.breakpoints.down('xl')] - Styles for extra-large screens.
     *   @property {string} paddingLeft - Adds padding on the left to align with content.
     *   @property {string} width - Sets the width to 1100px.
     * @property {object} [theme.breakpoints.down('lg')] - Styles for large screens.
     *   @property {string} paddingLeft - Adds padding on the left to align with content.
     *   @property {string} width - Sets the width to 750px.
     * @property {object} [theme.breakpoints.down('md')] - Styles for medium screens.
     *   @property {string} paddingLeft - Adds padding on the left to align with content.
     *   @property {string} width - Sets the width to 750px.
     * @property {object} [theme.breakpoints.down('sm')] - Styles for small screens.
     *   @property {string} paddingLeft - Removes left padding for better fit.
     *   @property {string} paddingTop - Adds top padding for better spacing.
     *   @property {string} width - Sets the width to 500px.
     * @property {object} [theme.breakpoints.down('xs')] - Styles for extra-small screens.
     *   @property {string} paddingLeft - Removes left padding for better fit.
     *   @property {string} paddingTop - Adds top padding for better spacing.
     *   @property {string|undefined} width - Sets width to undefined to allow full-width on extra-small screens.
     */
    TimeLineOverlay: {
        height: 'auto', // Maintain aspect ratio based on content
        [theme.breakpoints.down('xl')]: {
            paddingLeft: '100px',
            width: '1100px',
        },
        [theme.breakpoints.down('lg')]: {
            paddingLeft: '100px',
            width: '750px',
        },
        [theme.breakpoints.down('md')]: {
            paddingLeft: '100px',
            width: '750px',
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0px',
            paddingTop: '50px',
            width: '500px',
        },
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '0px',
            paddingTop: '50px',
            width: undefined,
        }
    }
}));
