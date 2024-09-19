const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

/**
 * Middleware to ensure that the request is authenticated.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const requireAuth = async (req, res, next) => {
    // Extract the 'Authorization' header from the request
    const { authorization } = req.headers;

    // If 'Authorization' header is missing, respond with a 401 Unauthorized status
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    // Extract the token from the 'Authorization' header
    const token = authorization.split(" ")[1];

    try {
        // Verify the token using the secret key from environment variables
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Find the user by their ID and attach the user object to the request
        req.user = await User.findOne({ _id }).select('_id');

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        // Respond with a 401 Unauthorized status if token verification fails
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;