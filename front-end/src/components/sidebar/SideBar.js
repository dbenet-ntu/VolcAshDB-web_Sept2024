import { Drawer, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { NavigationStyles } from '../navigation/Navigation.styles'
import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';

import { useState } from 'react';

import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import * as constants from "../../Constants";

/**
 * SideBar component: A navigation sidebar with various menus (Account, Statistics, Settings, etc.).
 * 
 * This component provides navigation options, handles user authentication, and allows 
 * switching between visibility modes for color blindness.
 * 
 * @param {Function} handleVisibilitySelect - Function to handle color blindness mode selection.
 * @param {string} visibilityMode - Currently selected color blindness mode.
 * @param {Function} toggleDrawer - Function to toggle the drawer open/close.
 * @param {boolean} drawerOpen - State of the drawer (open or closed).
 * 
 * @returns {JSX.Element} The sidebar component with conditional menus.
 */
export default function SideBar({ handleVisibilitySelect, visibilityMode, toggleDrawer, drawerOpen }) {

    // Use styles from NavigationStyles based on drawerOpen state
    const classes = NavigationStyles(drawerOpen);

    // Extract logout function and user data from hooks
    const { logout } = useLogout();
    const { user } = useAuthContext();

    // Local state for managing the open/closed state of dropdown menus
    const [colorBlindnessOpen, setColorBlindnessOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [statsOpen, setStatsOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Extract the user's role from the JWT token if the user is authenticated
    const userRole = user ? JSON.parse(atob(user.token.split('.')[1])).role : null;

    /**
     * Handles user logout by calling the logout function from the hook.
     */
    const handleLogout = () => {
        logout();
    };

    /**
     * Handles the selection of a visibility mode for color blindness.
     * 
     * @param {string} mode - The selected color blindness mode.
     */
    const handleVisibilityItemClick = (mode) => {
        handleVisibilitySelect(mode);
    };

    /**
     * Toggles the visibility of the Color Blindness menu.
     */
    const toggleColorBlindness = () => {
        setColorBlindnessOpen(!colorBlindnessOpen);
    };

    /**
     * Toggles the visibility of the Account menu.
     */
    const toggleAccount = () => {
        setAccountOpen(!accountOpen);
    };

    /**
     * Toggles the visibility of the Statistics menu (only for 'team member' role).
     */
    const toggleStats = () => {
        setStatsOpen(!statsOpen);
    };

    /**
     * Toggles the visibility of the Settings menu (only for 'admin' role).
     */
    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

    // Render the sidebar with conditional rendering based on user role and menu state
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={drawerOpen}
            classes={{ paper: classes.drawerPaper }}
        >
            <List>
                {/* Drawer Close Button */}
                <ListItem>
                    <IconButton color="inherit" onClick={toggleDrawer}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                    <ListItemText primary="General" style={{ paddingLeft: '40px' }} />
                </ListItem>

                {/* Account Menu */}
                <ListItem>
                    <IconButton color="inherit" disabled>
                        <AccountCircleIcon />
                    </IconButton>
                    <ListItemText primary="Account Menu" style={{ paddingLeft: '8px' }} />
                    <IconButton color="inherit" onClick={toggleAccount}>
                        {accountOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </ListItem>

                {/* Account dropdown items */}
                {accountOpen && user && 
                    <div>
                        <ListItem button component={Link} to="/user">
                            <ListItemText primary="User" />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </div> 
                }
                {accountOpen && !user && 
                    <div>
                        <ListItem button component={Link} to="/login">
                            <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button component={Link} to="/signup">
                            <ListItemText primary="Sign up" />
                        </ListItem>
                    </div>
                }

                {/* Stats Menu (only for team members) */}
                {userRole === 'team member' && 
                    <ListItem>
                        <IconButton color="inherit" disabled>
                            <QueryStatsIcon />
                        </IconButton>
                        <ListItemText primary="Statistic Menu" style={{ paddingLeft: '8px' }} />
                        <IconButton color="inherit" onClick={toggleStats}>
                            {statsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </ListItem>
                }

                {/* Stats dropdown (only for team members) */}
                {statsOpen && userRole === 'team member' && 
                    <ListItem button component={Link} to="/stats">
                        <ListItemText primary="Stats" />
                    </ListItem>
                }

                {/* Settings Menu (only for admins) */}
                {userRole === 'admin' && 
                    <ListItem>
                        <IconButton color="inherit" disabled>
                            <SettingsIcon />
                        </IconButton>
                        <ListItemText primary="Settings Menu" style={{ paddingLeft: '8px' }} />
                        <IconButton color="inherit" onClick={toggleSettings}>
                            {settingsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </ListItem>
                }

                {/* Settings dropdown (only for admins) */}
                {settingsOpen && userRole === 'admin' && 
                    <ListItem button component={Link} to="/settings">
                        <ListItemText primary="Settings" />
                    </ListItem>
                }
            </List>

            {/* Color Blindness Options */}
            <List>
                <ListItem>
                    <IconButton color="inherit" disabled>
                        <VisibilityIcon />
                    </IconButton>
                    <ListItemText primary="Color Blindness" style={{ paddingLeft: '8px' }} />
                    <IconButton color="inherit" onClick={toggleColorBlindness}>
                        {colorBlindnessOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </ListItem>

                {/* Dropdown for visibility modes */}
                {colorBlindnessOpen && Object.keys(constants.visibilityColors).map((mode) => (
                    <ListItem button key={mode} selected={mode === visibilityMode} onClick={() => handleVisibilityItemClick(mode)}>
                        <ListItemText primary={mode} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}