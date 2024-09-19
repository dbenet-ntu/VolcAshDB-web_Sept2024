import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global styles for the application
import App from "./App"; // Main application component
import reportWebVitals from "./reportWebVitals"; // Function to log performance metrics
import { AuthContextProvider } from './context/AuthContext'; // Context provider for user authentication
import { SessionContextProvider } from './context/SessionContext'; // Context provider for session management

/**
 * Entry point of the application.
 * Renders the React application into the root element.
 * 
 * @returns {void}
 */
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

/**
 * Render the application within the React.StrictMode for development checks.
 * Provides context providers for authentication and session management.
 */
root.render(
	<React.StrictMode>
		{/* Provides session context to the application */}
		<SessionContextProvider>
			{/* Provides authentication context to the application */}
			<AuthContextProvider>
				<App /> {/* Main application component */}
			</AuthContextProvider>
		</SessionContextProvider>
	</React.StrictMode>
);

// Report web vitals to measure performance
reportWebVitals();