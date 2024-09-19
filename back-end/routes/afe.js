const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');

const {
    get,
    add,
    remove,
    getVolcano
} = require('../controllers/afeController');

// AFE routes

/**
 * @route POST /get
 * @description Fetches some resource (specific details should be defined in the controller)
 * @access Public
 */
router.post('/get', get);

/**
 * @route POST /getVolcano
 * @description Fetches volcano details (specific details should be defined in the controller)
 * @access Public
 */
router.post("/getVolcano", getVolcano);

// Apply authentication middleware to all subsequent routes
router.use(requireAuth);

/**
 * @route POST /add
 * @description Adds a new resource (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/add', add);
  
/**
 * @route DELETE /:id
 * @description Removes a resource by its ID (specific details should be defined in the controller)
 * @access Protected
 */
router.delete('/:id', remove);

module.exports = router;