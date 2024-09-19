import { useState } from "react";
import { AuthenticationStyles } from './Authentication.styles';
import { useForgetPassword } from '../../hooks/useForgetPassword';

/**
 * ForgetPassword Component: Renders a form for users to request a password reset.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const ForgetPassword = () => {
    // State to manage the email input value
    const [email, setEmail] = useState('');

    // Hook to handle the forget password logic
    const { forgetPassword, isLoading, message, success } = useForgetPassword();

    // Hook for applying authentication styles
    const classes = AuthenticationStyles();

    /**
     * Handles form submission to request a password reset.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        await forgetPassword(email); // Call the forgetPassword function with the email
    };

    return (
        <div className={classes.Container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h3 className={classes.h3}>Forget Password</h3>

                <div className={classes.formContent}>
                    <label>Email:</label>
                    <input 
                        className={classes.input}
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        required
                    />
                </div>

                <button disabled={isLoading} className={classes.button}>Send Reset Link</button>
                
                {/* Display message if available, with conditional styling based on success */}
                {message && <div className={success ? classes.success : classes.error}>{message}</div>}
            </form>
        </div>
    );
};

export default ForgetPassword;
