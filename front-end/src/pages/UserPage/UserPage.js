import { useState } from "react";
import { UserPageStyles } from './UserPage.styles';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUpdateInformation } from '../../hooks/useUpdateInformation';
import countries from 'i18n-iso-countries';
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

/**
 * UserPage: Component for displaying and updating user account information.
 * Utilizes hooks for authentication and updating user information.
 * 
 * @returns {JSX.Element} - The rendered UserPage component.
 */
const UserPage = () => {
    // Extract user data from authentication context
    const { user } = useAuthContext();
    
    // State to manage email, country, and institute fields
    const [email, setEmail] = useState(user.email);
    const [country, setCountry] = useState(user.country || '');
    const [institute, setInstitute] = useState(user.institute || 'University/Institute');
    
    // Hook for applying styles from UserPage.styles
    const classes = UserPageStyles();
    
    // Custom hook for updating user information
    const { updateInformation, isLoading, success, message } = useUpdateInformation();

    /**
     * Handles form submission to update user information.
     * 
     * @param {object} e - The submit event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prepare the fields to be updated
        const updateFields = { email };
        if (country) updateFields.country = country;
        if (institute) updateFields.institute = institute;

        await updateInformation(updateFields);
    };

    /**
     * Handles changes to the country select field.
     * 
     * @param {object} e - The change event object.
     */
    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    /**
     * Handles changes to the institute input field.
     * 
     * @param {object} e - The change event object.
     */
    const handleInstituteChange = (e) => {
        setInstitute(e.target.value);
    };

    return (
        <div className={classes.Container}>
            {/* Form for updating user account information */}
            <form className={classes.form} onSubmit={handleSubmit}>

                <h3 className={classes.h3}>User account</h3>

                {/* Email input field */}
                <div className={classes.formContent}>
                    <label>Email:</label>
                    <input 
                        className={classes.input}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        disabled
                    />
                </div>
                
                {/* Country select field */}
                <div className={classes.formContent}>
                    <label>Country:</label>
                    <select 
                        className={classes.input}
                        value={country}
                        onChange={handleCountryChange}
                    >
                        <option value="">Select Country</option>
                        {Object.entries(countries.getNames("en")).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>

                {/* Institute input field */}
                <div className={classes.formContent}>
                    <label>Institute:</label>
                    <input 
                        className={classes.input}
                        type="text"
                        onChange={handleInstituteChange}
                        value={institute}
                    />
                </div>

                {/* Submit button */}
                <button disabled={isLoading} className={classes.button}>Submit</button>

                {/* Display message based on the success of the update */}
                {message && <div className={success ? classes.success : classes.error}>{message}</div>}
            
            </form>
        </div>
    );
};

export default UserPage;