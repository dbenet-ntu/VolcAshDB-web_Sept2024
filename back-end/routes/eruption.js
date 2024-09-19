const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');

const {
    get,
    add,
    remove
} = require('../controllers/eruptionController');

// Eruption routes

/**
 * @route POST /get
 * @description Fetches eruption data (specific details should be defined in the controller)
 * @access Public
 */
router.post('/get', get);

// Apply authentication middleware to all subsequent routes
router.use(requireAuth);

/**
 * @route POST /add
 * @description Adds a new eruption record (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/add', add);

/**
 * @route DELETE /:id
 * @description Removes an eruption record by its ID (specific details should be defined in the controller)
 * @access Protected
 */
router.delete('/:id', remove);

module.exports = router;