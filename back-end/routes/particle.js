const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');

const {
    get,
    getTags,
    getExamples,
    getTotalParticles,
    add,
    remove,
    update
} = require('../controllers/particleController');

// Public Particle routes

/**
 * @route POST /get
 * @description Fetches particle data (specific details should be defined in the controller)
 * @access Public
 */
router.post('/get', get);

/**
 * @route POST /tags
 * @description Fetches tags related to particles (specific details should be defined in the controller)
 * @access Public
 */
router.post('/tags', getTags);

/**
 * @route POST /getExamples
 * @description Fetches examples of particles (specific details should be defined in the controller)
 * @access Public
 */
router.post('/getExamples', getExamples);

/**
 * @route POST /getTotalParticles
 * @description Fetches the total count of particles (specific details should be defined in the controller)
 * @access Public
 */
router.post('/getTotalParticles', getTotalParticles);

// Apply authentication middleware to all subsequent routes
router.use(requireAuth);

/**
 * @route POST /add
 * @description Adds a new particle record (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/add', add);

/**
 * @route DELETE /:id
 * @description Removes a particle record by its ID (specific details should be defined in the controller)
 * @access Protected
 */
router.delete('/:id', remove);

/**
 * @route POST /update
 * @description Updates a particle record (specific details should be defined in the controller)
 * @access Protected
 */
router.post('/update', update);

module.exports = router;