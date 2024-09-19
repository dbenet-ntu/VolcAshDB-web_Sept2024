import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from './components/navigation/Navigation';
import SideBar from './components/sidebar/SideBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import CataloguePage from './pages/CatalogPage/CatalogPage';
import Dashboard from './pages/AnalyticPlots/Dashboard';
import AboutUs from './pages/AboutUs/AboutUs';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import UserPage from './pages/UserPage/UserPage';
import StatsPage from './pages/Stats/StatsPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Legal from './legal/Legal';
import VerifyCode from './pages/Authentication/VerifyCode';
import ForgetPassword from './pages/Authentication/ForgetPassword';
import ResetPassword from './pages/Authentication/ResetPassword';

/**
 * App Component: The main application component that handles routing and layout.
 * 
 * @returns {JSX.Element} - The rendered app component.
 */
function App() {

    // Authentication context hook to get the current user
    const { user } = useAuthContext();

    // State for managing visibility mode
    const [visibilityMode, setVisibilityMode] = useState('Default');

    // State for managing drawer (sidebar) visibility
    const [drawerOpen, setDrawerOpen] = useState(false);

    /**
     * Handles selection of visibility mode.
     * 
     * @param {string} mode - The selected visibility mode.
     */
    const handleVisibilitySelect = (mode) => {
        setVisibilityMode(mode);
    };

    /**
     * Toggles the state of the drawer (sidebar).
     */
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <React.Fragment>
            {/* CssBaseline component to normalize styles across browsers */}
            <CssBaseline />
            
            {/* Router component to handle routing within the application */}
            <Router>
                {/* Navigation component with drawer toggle and open state */}
                <Navigation 
                    toggleDrawer={toggleDrawer}
                    drawerOpen={drawerOpen}
                />
                
                {/* SideBar component with visibility mode and drawer controls */}
                <SideBar 
                    handleVisibilitySelect={handleVisibilitySelect} 
                    visibilityMode={visibilityMode} 
                    toggleDrawer={toggleDrawer}
                    drawerOpen={drawerOpen}
                />
                
                {/* Routes for handling navigation between different pages */}
                <Routes>
                    {/* Route for CataloguePage, passing visibility mode */}
                    <Route path={'/catalogue'} element={<CataloguePage visibilityMode={visibilityMode}/>}/>
                    
                    {/* Route for Dashboard, passing visibility mode */}
                    <Route path={'/analytic'} element={<Dashboard visibilityMode={visibilityMode}/>}/>
                    
                    {/* Route for AboutUs page */}
                    <Route path={'/about'} element={<AboutUs />} />
                    
                    {/* Route for Home page, passing visibility mode */}
                    <Route path={'/'} element={<Home visibilityMode={visibilityMode}/>}/>
                    
                    {/* Route for UserPage, redirecting to login if user is not authenticated */}
                    <Route path={'/user'} element={!user ? <Navigate to="/login"/> : <UserPage/>}/>
                    
                    {/* Route for Login page, redirecting to home if user is authenticated */}
                    <Route path={'/login'} element={!user ? <Login/> : <Navigate to="/"/>}/>
                    
                    {/* Route for Signup page, redirecting to home if user is authenticated */}
                    <Route path={'/signup'} element={!user ? <Signup/> : <Navigate to="/"/>}/>
                    
                    {/* Route for StatsPage, redirecting to home if user is not authenticated */}
                    <Route path={'/stats'} element={user ? <StatsPage visibilityMode={visibilityMode}/> : <Navigate to="/"/>}/>
                    
                    {/* Route for SettingsPage, redirecting to home if user is not authenticated */}
                    <Route path={'/settings'} element={user ? <SettingsPage visibilityMode={visibilityMode}/> : <Navigate to="/"/>}/>
                    
                    {/* Route for Legal page */}
                    <Route path={'/legal'} element={<Legal />} />
                    
                    {/* Route for VerifyCode page, redirecting to home if user is not authenticated */}
                    <Route path={'/verify'} element={user ? <VerifyCode/> : <Navigate to="/"/>} />
                    
                    {/* Route for ForgetPassword page */}
                    <Route path={'/forget'} element={<ForgetPassword />} />
                    
                    {/* Route for ResetPassword page, redirecting to home if user is authenticated */}
                    <Route path={'/reset/:token'} element={!user ? <ResetPassword /> : <Navigate to="/"/>}/>
                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App;