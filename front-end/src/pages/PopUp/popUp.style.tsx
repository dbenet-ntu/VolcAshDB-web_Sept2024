import { makeStyles } from '@material-ui/core/styles';

/**
 * popUpStyle: Defines custom styles for the PopUp component.
 * Utilizes Material-UI's `makeStyles` to create a hook for styling.
 * 
 * @param {object} theme - The Material-UI theme object for responsive design.
 * @returns {object} - The styles object to be used in the PopUp component.
 */
export const popUpStyle = makeStyles((theme) => ({
    /**
     * overlay style: Covers the entire screen and darkens the background.
     * 
     * @property {string} position - Positions the overlay fixed on the screen, ensuring it stays in place.
     * @property {string} backgroundColor - Applies a semi-transparent black background (0.7 opacity).
     * @property {string} display - Flexbox is used to center the modal both vertically and horizontally.
     * @property {string} alignItems - Vertically aligns modal in the center of the screen.
     * @property {string} justifyContent - Horizontally aligns modal in the center of the screen.
     * @property {string} width - Takes up the full width of the viewport.
     * @property {string} height - Takes up the full height of the viewport.
     */
    overlay: {
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Full width of the screen
        height: '100%', // Full height of the screen
    },

    /**
     * modal style: Styles the modal window content that appears inside the overlay.
     * 
     * @property {string} backgroundColor - Sets the modal's background to white.
     * @property {string} padding - Provides 20px padding inside the modal for spacing.
     * @property {string} borderRadius - Rounds the corners of the modal with 8px.
     * @property {string} position - Positions elements relative to the modal (used for the close button).
     * @property {string} width - The modal width is set to 80% of the viewport width.
     * @property {string} height - The modal height is set to 80% of the viewport height.
     * @property {string} overflowY - Allows vertical scrolling if content exceeds the modal's height.
     * @property {string} overflowX - Hides horizontal scrolling to maintain layout.
     */
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        position: 'relative', // Necessary for positioning the close button inside the modal
        width: '80%', // Takes 80% of the screen width
        height: '80%', // Takes 80% of the screen height
        overflowY: 'scroll', // Enables vertical scrolling for long content
        overflowX: 'hidden', // Disables horizontal scrolling
    },

    /**
     * closeBtn style: Styles the close button inside the modal.
     * 
     * @property {string} position - Absolutely positions the button relative to the modal.
     * @property {string} top - Aligns the button 10px from the top of the modal.
     * @property {string} right - Aligns the button 10px from the right of the modal.
     * @property {string} background - Makes the background transparent for the close button.
     * @property {string} border - Removes default borders from the button.
     * @property {string} fontSize - Sets the font size to 18px for visibility.
     * @property {string} cursor - Changes the cursor to a pointer when hovering over the button.
     */
    closeBtn: {
        position: 'absolute', // Positioned relative to the modal
        top: '10px', // 10px from the top of the modal
        right: '10px', // 10px from the right of the modal
        background: 'transparent', // Transparent background for the button
        border: 'none', // Removes default borders
        fontSize: '18px', // Makes the "X" large enough to be noticeable
        cursor: 'pointer', // Changes the cursor to a pointer on hover
    }
}));