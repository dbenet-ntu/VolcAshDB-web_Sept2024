const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');

const { 
    getTotalUsers, 
    getRequestsPerDay, 
    getUsersPerDay 
} = require('../controllers/requestController');

// Apply authentication middleware to all routes
router.use(requireAuth);

/**
 * @route POST /total-users
 * @description Fetches the total number of users (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/total-users', getTotalUsers);

/**
 * @route POST /requests-per-day
 * @description Fetches the number of requests per day (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/requests-per-day', getRequestsPerDay);

/**
 * @route POST /users-per-day
 * @description Fetches the number of users created per day (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/users-per-day', getUsersPerDay);

module.exports = router;