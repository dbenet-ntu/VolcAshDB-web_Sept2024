import { useState } from "react";
import { useParams } from "react-router-dom";
import { AuthenticationStyles } from './Authentication.styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useResetPassword } from "../../hooks/useResetPassword";

/**
 * ResetPassword Component: Provides a form to reset the user's password using a token from the URL.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const ResetPassword = () => {
    // State to manage the new password input
    const [password, setPassword] = useState('');
    
    // State to manage the password confirmation input
    const [confirmpassword, setConfirmPassword] = useState('');
    
    // Extract the reset token from the URL parameters
    const { token } = useParams();
    
    // Hook to handle the password reset logic
    const { resetPassword, isLoading, success, message } = useResetPassword();
    
    // Hook for applying authentication styles
    const classes = AuthenticationStyles();
    
    // State to toggle visibility of the new password input
    const [showPassword, setShowPassword] = useState(false);
    
    // State to toggle visibility of the confirm password input
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    /**
     * Handles form submission for resetting the password.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Call the resetPassword function with the token, new password, and confirmation password
        await resetPassword(token, password, confirmpassword);
    };

    return (
        <div className={classes.Container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                
                <h3 className={classes.h3}>Reset Password</h3>

                <div className={classes.formContent}>
                    <label>New Password:</label>
                    <input 
                        className={classes.input}
                        type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        required
                    />
                    <span 
                        className={classes.icon} 
                        onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                    >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </span>
                </div>

                <div className={classes.formContent}>
                    <label>Confirm Password:</label>
                    <input 
                        className={classes.input}
                        type={showConfirmPassword ? "text" : "password"} // Toggle input type based on showConfirmPassword state
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        value={confirmpassword} 
                        required
                    />
                    <span 
                        className={classes.icon} 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                    >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </span>
                </div>

                <button 
                    disabled={isLoading} // Disable button while loading
                    className={classes.button}
                >
                    Reset Password
                </button>

                {message && (
                    <div className={success ? classes.success : classes.error}>
                        {message}
                    </div>
                )} {/* Display success or error message if present */}
            </form>
        </div>
    );
};

export default ResetPassword;
