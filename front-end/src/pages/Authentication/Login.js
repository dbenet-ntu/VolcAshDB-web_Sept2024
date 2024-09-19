import { useState } from "react";
import { useLogin } from '../../hooks/useLogin';
import { AuthenticationStyles } from './Authentication.styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useNavigate } from 'react-router-dom';

/**
 * Login Component: Provides a form for user login with email and password.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const Login = () => {
    // State to manage email input
    const [email, setEmail] = useState('');
    
    // State to manage password input
    const [password, setPassword] = useState('');
    
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    
    // Hook to handle login logic
    const { login, error, isLoading } = useLogin();
    
    // Hook for applying authentication styles
    const classes = AuthenticationStyles();
    
    // Hook for navigation
    const navigate = useNavigate();

    /**
     * Handles form submission for user login.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        await login(email, password); // Call the login function with email and password
    };

    return (
        <div className={classes.Container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                
                <h3 className={classes.h3}>Log in</h3>

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

                <div className={classes.formContent}>
                    <label>Password:</label>
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

                <button 
                    disabled={isLoading} // Disable button while loading
                    className={classes.button}
                >
                    Log in
                </button>

                {error && <div className={classes.error}>{error}</div>} {/* Display error message if present */}

                <div className={classes.forgotPassword}>
                    <span onClick={() => navigate('/forget')}>Forgot Password?</span> {/* Navigate to forget password page */}
                </div>
            </form>
        </div>
    );
};

export default Login;