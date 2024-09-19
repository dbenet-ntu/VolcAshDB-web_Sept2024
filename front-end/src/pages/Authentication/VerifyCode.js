import { useState } from "react";
import { useVerifyCode } from "../../hooks/useVerifyCode";  // Custom hook for verification
import { AuthenticationStyles } from './Authentication.styles';
import { useAuthContext } from '../../hooks/useAuthContext';

/**
 * VerifyCode Component: Provides a form for users to enter a verification code to verify their email address.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const VerifyCode = () => {
    // Retrieve the current authenticated user from context
    const { user } = useAuthContext();

    // State to manage the verification code input
    const [code, setCode] = useState('');

    // Hook to handle verification logic
    const { verify, error, isLoading } = useVerifyCode();

    // Hook to apply authentication styles
    const classes = AuthenticationStyles();

    /**
     * Handles form submission for verifying the code.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Call the verify function with the user's email and the provided code
        await verify(user.email, code);
    };

    return (
        <div className={classes.Container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h3 className={classes.h3}>Verify Your Email</h3>

                <div className={classes.formContent}>
                    <label>Verification Code:</label>
                    <input 
                        className={classes.input}
                        type="text"
                        onChange={(e) => setCode(e.target.value)} // Update code state
                        value={code}
                    />
                </div>

                <button 
                    disabled={isLoading} // Disable button while loading
                    className={classes.button}
                >
                    Verify
                </button>

                {error && <div className={classes.error}>{error}</div>} {/* Display error message if present */}
            </form>
        </div>
    );
};

export default VerifyCode;
