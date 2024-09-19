const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');

const {
    get,
    getAnnotationDistribution,
    add, 
    remove
} = require('../controllers/opinionController');

// Apply authentication middleware to all routes
router.use(requireAuth);

/**
 * @route POST /get
 * @description Fetches opinion data (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/get', get);

/**
 * @route POST /getDistribution
 * @description Fetches distribution of annotations for opinions (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/getDistribution', getAnnotationDistribution);

/**
 * @route POST /add
 * @description Adds a new opinion record (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/add', add);

/**
 * @route DELETE /:id
 * @description Removes an opinion record by its ID (specific details should be defined in the controller)
 * @access Protected
 */
router.delete('/:id', remove);

module.exports = router;