import { popUpStyle } from './popUp.style';

/**
 * PopUp: A reusable modal component that renders its children inside a popup overlay.
 * The modal can be closed using the close button, which triggers the `onClose` function passed via props.
 * 
 * @param {object} props - The properties object.
 * @param {ReactNode} props.children - The content to be displayed inside the modal.
 * @param {function} props.onClose - A function to be called when the close button is clicked.
 * @returns {JSX.Element} - The rendered PopUp component.
 */
const PopUp = ({ children, onClose }) => {
    // Apply custom styles defined in popUp.style using the hook
    const classes = popUpStyle();

    return (
        // The overlay that dims the background and centers the modal
        <div className={classes.overlay}>
            {/* The modal itself which contains the children content and close button */}
            <div className={classes.modal}>
                {/* Render any content passed as children */}
                {children}
                
                {/* Close button to trigger the onClose function */}
                <button className={classes.closeBtn} onClick={() => onClose()}>X</button>
            </div>
        </div>
    );
};

export default PopUp;