const { Request } = require('../models/request');
const { User } = require('../models/user');

/**
 * Middleware to log incoming requests to the 'Request' collection.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const logRequest = async (req, res, next) => {
    try {
        const sessionId = req.body.sessionId; // Extract session ID from request body
        const requestType = req.method; // HTTP method of the request (GET, POST, etc.)
        const requestUrl = req.url; // URL of the request

        const requestData = {
            sessionId,
            requestType,
            requestUrl
        };
    
        // Save request data to the 'Request' collection
        await Request.create(requestData);

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(500).json({ error: 'Failed to log request' });
    }
};

/**
 * Retrieves the total number of users from the 'User' collection.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getTotalUsers = async (req, res) => {
    try {
        const userCount = await User.countDocuments(); // Count the total number of user documents
        
        res.status(200).json({ totalUsers: userCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch total users' });
    }
};

/**
 * Retrieves the number of requests per day.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getRequestsPerDay = async (req, res) => {
    try {
        const requestsPerDay = await Request.aggregate([
            { 
                $group: { 
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
                    count: { $sum: 1 } // Count requests per day
                }
            },
            { $sort: { _id: 1 } } // Sort by date
        ]);

        res.status(200).json(requestsPerDay);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch requests per day' });
    }
};

/**
 * Retrieves the number of unique users per day based on session IDs.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getUsersPerDay = async (req, res) => {
    try {
        const usersPerDay = await Request.aggregate([
            { 
                $group: { 
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
                    sessions: { $addToSet: "$sessionId" } // Collect unique session IDs per day
                }
            },
            {
                $project: {
                    _id: 1,
                    count: { $size: "$sessions" } // Count the number of unique sessions per day
                }
            }
        ]);
        
        res.status(200).json(usersPerDay);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users per day' });
    }
};

module.exports = { logRequest, getTotalUsers, getRequestsPerDay, getUsersPerDay };
