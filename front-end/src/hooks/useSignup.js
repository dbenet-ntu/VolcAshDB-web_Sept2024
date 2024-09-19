import { useState } from "react";
import { useSessionContext } from './useSessionContext';
import { useNavigate } from 'react-router-dom'; 
import { useAuthContext } from "./useAuthContext";
import * as constants from '../Constants';

/**
 * Custom hook for handling user signup.
 * 
 * @returns {Object} - Contains the signup function, loading state, and error message.
 */
export const useSignup = () => {
    const [error, setError] = useState(null); // State for storing error messages
    const [isLoading, setIsLoading] = useState(null); // State for loading status
    const { sessionId } = useSessionContext(); // Get session ID from context
    const { dispatch } = useAuthContext(); // Access authentication context dispatch
    const navigate = useNavigate(); // Hook for navigation
    const proxy = constants.PROXY; // API proxy URL

    /**
     * Handles user signup by sending user details to the server.
     * 
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     * @param {string} confirmpassword - User's password confirmation.
     * @param {string} country - User's country.
     * @param {string} institute - User's institute.
     */
    const signup = async (email, password, confirmpassword, country, institute) => {
        setIsLoading(true); // Set loading to true
        setError(null); // Clear previous errors

        try {
            // Send signup request to the server
            const response = await fetch(`${proxy}/user/signup`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password, confirmpassword, country, institute, sessionId})
            });

            // Parse JSON response
            const json = await response.json();

            if (!response.ok) {
                // Set error state if response is not ok
                setIsLoading(false);
                setError(json.error);
            } else {
                // Save user data to local storage
                localStorage.setItem('user', JSON.stringify(json));
                
                // Update authentication context
                dispatch({ type: 'LOGIN', payload: json });

                setIsLoading(false);

                // Redirect to the verification page
                navigate('/verify');
            }
        } catch (err) {
            // Handle network errors
            setIsLoading(false);
            setError('An unexpected error occurred.');
        }
    };

    return { signup, isLoading, error }; // Return values
};