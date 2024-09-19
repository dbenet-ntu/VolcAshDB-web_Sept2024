import { useState } from "react";
import { AuthenticationStyles } from './Authentication.styles';
import { useSignup } from '../../hooks/useSignup';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import countries from 'i18n-iso-countries';
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

/**
 * Signup Component: Provides a form for users to sign up with their email, password, country, and institute information.
 * 
 * @returns {JSX.Element} The rendered component.
 */
const Signup = () => {
    // State to manage the email input
    const [email, setEmail] = useState('');
    
    // State to manage the password input
    const [password, setPassword] = useState('');
    
    // State to manage the password confirmation input
    const [confirmpassword, setConfirmPassword] = useState('');
    
    // State to manage the selected country
    const [country, setCountry] = useState('');
    
    // State to manage the institute input
    const [institute, setInstitute] = useState('University/Institute');
    
    // Hook to apply authentication styles
    const classes = AuthenticationStyles();
    
    // Hook to handle signup logic
    const { signup, error, isLoading } = useSignup();
    
    // State to toggle visibility of the password input
    const [showPassword, setShowPassword] = useState(false);
    
    // State to toggle visibility of the confirm password input
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    /**
     * Handles form submission for signing up.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Call the signup function with email, password, confirmation password, country, and institute
        await signup(email, password, confirmpassword, country, institute);
    };

    /**
     * Handles changes to the country select input.
     * 
     * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event.
     */
    const handleCountryChange = (e) => {
        setCountry(e.target.value); // Update state with selected country
    };

    /**
     * Handles changes to the institute input.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     */
    const handleInstituteChange = (e) => {
        setInstitute(e.target.value); // Update state with institute value
    };

    return (
        <div className={classes.Container}>
            <form className={classes.form} onSubmit={handleSubmit}>

                <h3 className={classes.h3}>Sign Up</h3>

                <div className={classes.formContent}>
                    <label>Email:</label>
                    <input 
                        className={classes.input}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                        value={email}
                    />
                </div>
                
                <div className={classes.formContent}>
                    <label>Password:</label>
                    <input 
                        className={classes.input}
                        type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                        value={password}
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
                        onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                        value={confirmpassword}
                    />
                    <span 
                        className={classes.icon} 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                    >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </span>
                </div>

                <hr style={{width: '80%', margin: '20px'}} /> {/* Divider for visual separation */}

                <div className={classes.formContent}>
                    <label>Country:</label>
                    <select 
                        className={classes.input}
                        value={country}
                        onChange={handleCountryChange} // Update country state
                    >
                        <option value="">Select Country</option>
                        {Object.entries(countries.getNames("en")).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option> // Render country options
                        ))}
                    </select>
                </div>

                <div className={classes.formContent}>
                    <label>Institute:</label>
                    <input 
                        className={classes.input}
                        type="text"
                        onChange={handleInstituteChange} // Update institute state
                        value={institute}
                    />
                </div>

                <button 
                    disabled={isLoading} // Disable button while loading
                    className={classes.button}
                >
                    Sign up
                </button>

                {error && <div className={classes.error}>{error}</div>} {/* Display error message if present */}

            </form>
        </div>
    );
};

export default Signup;