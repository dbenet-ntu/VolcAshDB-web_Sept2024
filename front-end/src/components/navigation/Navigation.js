import { AppBar, Toolbar, Button, Grid, IconButton } from '@material-ui/core'
import { NavigationStyles } from './Navigation.styles'
import { Link } from "react-router-dom"
import PersonIcon from '@material-ui/icons/Person';

/**
 * Navigation component for the app's top bar.
 * 
 * @param {function} toggleDrawer - Function to toggle the state of the drawer (sidebar).
 * @param {boolean} drawerOpen - State indicating if the drawer is open or closed.
 * @returns {JSX.Element} - The rendered navigation bar.
 */
export default function Navigation({ toggleDrawer, drawerOpen }) {

    // Apply custom styles based on the drawerOpen state
    const classes = NavigationStyles(drawerOpen);

    return (
        // AppBar serves as the top navigation bar
        <AppBar position='static' className={classes.AppBar}>
            <Toolbar className={classes.navToolBar}>
                
                {/* Logo that links to the homepage */}
                <Link to="/" className={classes.navLogo}>VolcAshDB</Link>
                
                {/* Navigation buttons inside a Grid layout */}
                <Grid item className={classes.navMenu}>
                    <Button className={classes.navBtn} color='inherit' component={Link} to="/">Home</Button>
                    <Button className={classes.navBtn} color='inherit' component={Link} to="/about">About</Button>
                    <Button className={classes.navBtn} color='inherit' component={Link} to="/catalogue">Catalogue</Button>
                    <Button className={classes.navBtn} color='inherit' component={Link} to="/analytic">Plots</Button>
                </Grid>
                
                {/* Icon button to toggle the drawer (sidebar) */}
                <IconButton color="inherit" onClick={toggleDrawer}>
                    {/* Display the Person icon only when the drawer is closed */}
                    {!drawerOpen ? <PersonIcon /> : null}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}