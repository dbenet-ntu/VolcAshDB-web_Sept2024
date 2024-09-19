import { makeStyles } from '@material-ui/core/styles';

/**
 * useStyles Hook: Defines and provides styles for the Dashboard component.
 * 
 * @param {object} theme - The Material-UI theme object for responsive design.
 * @returns {object} - The styles object for the Dashboard component.
 */
export const DashBoardStyle = makeStyles((theme) => ({
    /**
     * Styles for the overlay containers around the charts in the Dashboard.
     * 
     * @property {string} color - Text color, adjusted to fit design requirements.
     * @property {string} marginTop - Space above the chart overlay.
     * @property {string} maxWidth - Maximum width of the chart overlay.
     * @property {string} textAlign - Centers the text within the overlay.
     * @property {string} padding - Padding around the content.
     * @property {string} backgroundColor - Semi-transparent background color for the overlay.
     * @property {string} borderRadius - Rounded corners for the overlay.
     * @property {string} margin - Margin top and bottom for spacing between overlays.
     * @property {string} boxShadow - Subtle shadow for depth effect.
     */
    ChartOverlay: {
        color: "black",
        marginTop: "20px",
        maxWidth: "900px",
        textAlign: "center",
        padding: '1rem',
        backgroundColor: '#e9e9e9f7',
        borderRadius: '5px',
        margin: '1rem 0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },

    /**
     * Styles for the custom switch component in the Dashboard.
     * 
     * @property {object} 'react-switch-handle' - Custom styles for the handle part of the switch.
     * @property {string} transform - Custom handle translation.
     * @property {object} '& .react-switch-handle' - Removes the box shadow from the switch handle.
     * @property {string} boxShadow - Ensures no box shadow is applied.
     * @property {object} '& .react-switch-bg div' - Custom width for the inner div inside the switch background.
     * @property {string} width - Sets width of the inner div.
     */
    switch: {
        'react-switch-handle': {
            transform: { translateX: "122px"},
        },
        '& .react-switch-handle': {
            boxShadow: 'none !important',
        },
        '& .react-switch-bg div': {
            width: '130px !important',
        },
    }
}));
