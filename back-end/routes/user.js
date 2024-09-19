const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const requireAdminRole = require('../middlewares/requireAdminRole');

const { 
    signupUser, 
    loginUser, 
    verifyUser,
    update,
    getRoles,
    forgetPassword,
    resetPassword
} = require('../controllers/userController');

// Public routes

/**
 * @route POST /login
 * @description Logs in a user (specific details should be defined in the controller)
 * @access Public
 */
router.post('/login', loginUser);

/**
 * @route POST /signup
 * @description Signs up a new user (specific details should be defined in the controller)
 * @access Public
 */
router.post('/signup', signupUser);

/**
 * @route POST /verify
 * @description Verifies a user's email or account (specific details should be defined in the controller)
 * @access Public
 */
router.post('/verify', verifyUser);

/**
 * @route POST /forget
 * @description Initiates the password recovery process (specific details should be defined in the controller)
 * @access Public
 */
router.post('/forget', forgetPassword);

// Apply authentication middleware to all routes after this point
router.use(requireAuth);

/**
 * @route POST /reset/:token
 * @description Resets the password using a provided token (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/reset/:token', resetPassword);

/**
 * @route POST /update
 * @description Updates the user's profile (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/update', update);

/**
 * @route POST /roles
 * @description Fetches the roles available in the system (specific details should be defined in the controller)
 * @access Protected, Admin only
 */
router.post('/roles', requireAdminRole, getRoles);

module.exports = router;