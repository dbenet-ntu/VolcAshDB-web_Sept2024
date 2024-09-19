import { makeStyles } from '@material-ui/core/styles';

/**
 * FilterAndDownloadStyle: Custom styles for the filter and download buttons component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styles.
 * 
 * @param {object} theme - The Material-UI theme object.
 * @returns {object} The styles object.
 */
export const FilterAndDownloadStyle = makeStyles((theme) => ({
    /**
     * Style for the container holding the filter and download buttons.
     * 
     * @property {string} padding - Resets padding to default.
     */
    FilterDownloadButtons: {
        padding: 'revert',
    },
    
    /**
     * Style for the filter button.
     * 
     * @property {string} backgroundColor - Dark green background color.
     * @property {number} fontWeight - Bold text.
     * @property {number} height - Fixed height.
     * @property {string} padding - Resets padding to default.
     * @property {string} borderRadius - Rounded corners.
     * @property {string} color - White text color.
     * @property {string} margin - Margins around the button.
     * @property {object} [theme.breakpoints.down('xl')] - Font size for extra-large screens.
	 * @property {string} fontSize - Set font size.
     * @property {object} [theme.breakpoints.down('lg')] - Font size for large screens.
	 * @property {string} fontSize - Maintain the same font size.
     * @property {object} [theme.breakpoints.down('md')] - Font size for medium screens.
	 * @property {string} fontSize - Maintain the same font size.
     * @property {object} [theme.breakpoints.down('sm')] - Font size for small screens.
     * @property {string} fontSize - Decrease font size.
     * @property {object} [theme.breakpoints.down('xs')] - Font size and margins for extra-small screens.
	 * @property {string} fontSize - Decrease font size even more.
	 * @property {string} margin - Decrease margins around the button.
     */
    FilterButton: {
        backgroundColor: "#388e3c",
        fontWeight: 700,
        height: 40,
        padding: 'revert',
        borderRadius: "20px",
        color: "white",
        margin: "20px 30px",
        [theme.breakpoints.down('xl')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.6rem',
            margin: "20px 15px",
        }
    },
    
    /**
     * Style for the download button.
     * 
     * @property {string} backgroundColor - Orange background color.
     * @property {number} fontWeight - Bold text.
     * @property {number} height - Fixed height.
     * @property {string} borderRadius - Rounded corners.
     * @property {string} color - White text color.
     * @property {string} margin - Margins around the button.
     * @property {object} [theme.breakpoints.down('xl')] - Font size for extra-large screens.
	 * @property {string} fontSize - Set font size.
     * @property {object} [theme.breakpoints.down('lg')] - Font size for large screens.
	 * @property {string} fontSize - Maintain the same font size.
     * @property {object} [theme.breakpoints.down('md')] - Font size for medium screens.
	 * @property {string} fontSize - Maintain the same font size.
     * @property {object} [theme.breakpoints.down('sm')] - Font size for small screens.
	 * @property {string} fontSize - Decrease font size.
     * @property {object} [theme.breakpoints.down('xs')] - Font size and margins for extra-small screens.
	 * @property {string} fontSize - Decrease font size even more.
	 * @property {string} margin - Decrease margins around the button.
     */
    DownloadButton: {
        backgroundColor: "#f57c00",
        fontWeight: 700,
        height: 40,
        borderRadius: "20px",
        color: "white",
        margin: "20px 30px",
        [theme.breakpoints.down('xl')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.6rem',
            margin: "20px 15px",
        }
    }
}));
