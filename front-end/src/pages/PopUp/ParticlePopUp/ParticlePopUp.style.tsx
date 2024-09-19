import { makeStyles } from '@material-ui/core/styles';

/**
 * ParticlePopUpStyle: Defines custom styles for the ParticlePopUp component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styling.
 * 
 * @param {object} theme - The Material-UI theme object for responsive design.
 * @returns {object} - The styles object to be used in the ParticlePopUp component.
 */
export const ParticlePopUpStyle = makeStyles((theme) => ({
    /**
     * ParticlePopUp style: Styles the main container of the pop-up.
     * 
     * @property {string} display - Uses flexbox to layout the child elements.
     * @property {string} alignItems - Aligns items based on screen size.
     *   - On xl and lg screens, aligns items to the start.
     *   - On md and smaller screens, switches to a column layout and centers items.
     */
    ParticlePopUp: {
        display: 'flex',
        [theme.breakpoints.down('xl')]: {
            alignItems: 'flex-start',  // Align items at the start for xl screens and below
        },
        [theme.breakpoints.down('lg')]: {
            alignItems: 'flex-start',  // Align items at the start for lg screens and below
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',   // Change to column layout on md screens and below
            alignItems: 'center',      // Center items for md screens
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',   // Column layout on sm screens
            alignItems: 'center',      // Center items for sm screens
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',   // Column layout on xs screens
            alignItems: 'center',      // Center items for xs screens
        },
    },

    /**
     * Image style: Styles the images within the pop-up.
     * 
     * @property {string} width - Sets the image width to 80% of the container.
     * @property {string} height - Sets the image height to 80% of the container.
     */
    Image: {
        width: "80%",  // Image takes up 80% of the container's width
        height: "80%"  // Image takes up 80% of the container's height
    },

    /**
     * Grid style: Styles the grid layout within the pop-up.
     * 
     * @property {string} display - Flexbox layout for grid items.
     * @property {string} flexDirection - Defines initial column layout, changing based on screen size.
     *   - On md screens and below, switches to row layout.
     *   - On xs screens, switches back to column layout.
     * @property {string} width - Adjusts the grid width based on screen size.
     * @property {string} fontSize - Decreases font size on smaller screens.
     */
    Grid: {
        display: 'flex',                // Flex container for grid layout
        flexDirection: 'column',        // Initially set to column layout
        justifyContent: 'space-around', // Space grid items evenly
        width: "30%",                   // Grid takes up 30% of the container width

        [theme.breakpoints.down('md')]: {
            width: "100%",              // Grid takes full width on md screens and below
            fontSize: '0.8rem',          // Reduced font size on md screens and below
            flexDirection: 'row',        // Switch to row layout on md screens
        },
        [theme.breakpoints.down('sm')]: {
            width: "100%",              // Full width on sm screens
            fontSize: '0.8rem',          // Reduced font size for sm screens
            flexDirection: 'row',        // Row layout for sm screens
        },
        [theme.breakpoints.down('xs')]: {
            width: "100%",              // Full width on xs screens
            fontSize: '0.8rem',          // Same reduced font size
            flexDirection: 'column',     // Return to column layout on xs screens
        },
    }
}));