import { createContext, useReducer, useEffect } from 'react'

// Create an AuthContext to provide and consume authentication data globally
export const AuthContext = createContext()

/**
 * Reducer function to manage authentication state.
 * 
 * @param {Object} state - Current state of the authentication context.
 * @param {Object} action - Action containing the type and optional payload to modify the state.
 * @returns {Object} Updated state based on the action type.
 */
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload } // Set the user upon login
        case 'LOGOUT':
            return { user: null } // Clear the user upon logout
        case 'UPDATE_USER':
            return { user: { ...state.user, ...action.payload } } // Update user information
        default:
            return state // Return the current state if action is not recognized
    }
}

/**
 * AuthContextProvider component to wrap the application and provide authentication context.
 * 
 * @param {Object} props - The children components that will be wrapped by this context.
 */
export const AuthContextProvider = ({ children }) => {

    // Initialize reducer for handling auth state with default state (user: null)
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    /**
     * Effect to load user data from localStorage on initial load.
     * If the user is authenticated and the token is still valid, dispatch LOGIN.
     * If the token has expired, the user is logged out and removed from localStorage.
     */
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) // Retrieve user from localStorage

        if (user && user.token) {
            // Decode JWT token to get the expiration time
            const expirationTime = JSON.parse(atob(user.token.split('.')[1])).exp * 1000

            if (expirationTime < Date.now()) {
                // If token is expired, remove user from localStorage and dispatch LOGOUT
                localStorage.removeItem('user')
                dispatch({ type: 'LOGOUT', payload: user })
            } else {
                // If token is still valid, dispatch LOGIN with user data
                dispatch({ type: 'LOGIN', payload: user })
            }
        }
    }, []) // Run effect only once after component mounts

    /**
     * Function to set the user and store user data in localStorage.
     * 
     * @param {Object} user - User object to be stored in localStorage and updated in state.
     */
    const setUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user)) // Save user data to localStorage
        dispatch({ type: 'LOGIN', payload: user }) // Dispatch LOGIN action to update state
    }

    /**
     * Function to update specific user fields in both localStorage and the state.
     * 
     * @param {Object} updatedFields - Fields to be updated for the current user.
     */
    const updateUser = (updatedFields) => {
        const updatedUser = { ...state.user, ...updatedFields } // Merge updated fields with current user
        localStorage.setItem('user', JSON.stringify(updatedUser)) // Save updated user data in localStorage
        dispatch({ type: 'UPDATE_USER', payload: updatedFields }) // Dispatch UPDATE_USER action to modify state
    }

    // Provide the auth state, dispatch function, and setUser/updateUser functions to children
    return (
        <AuthContext.Provider value={{ ...state, dispatch, setUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}