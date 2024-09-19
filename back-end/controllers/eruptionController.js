const { default: mongoose } = require('mongoose');
const { Eruption } = require('../models/eruption');

/**
 * Retrieves all Eruption documents from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const get = async (req, res) => {
    try {
        // Fetch all Eruption documents
        const eruptions = await Eruption.find();
        
        res.status(200).json({ success: true, eruptions });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Adds or updates an Eruption document based on provided data.
 * Validates that the end date is after the start date.
 * @param {Object} req - The request object containing the Eruption data.
 * @param {Object} res - The response object.
 */
const add = async (req, res) => {
    // Validate that end date is not before start date
    if (req.body.ed_starttime && req.body.ed_endtime && req.body.ed_starttime > req.body.ed_endtime) {
        return res.status(404).json({ success: false, message: 'End date must be more recent than start date' });
    }

    try {
        // Create a new Eruption instance from the request body
        const newEruption = new Eruption(req.body);
        // Query to find the document to update or create
        const query = {
            volc_num: newEruption.volc_num,
            ed_code: newEruption.ed_code
        };
        // Options for the update operation
        const options = {
            upsert: true, // Create a new document if none matches the query
            new: true, // Return the modified document rather than the original
            setDefaultsOnInsert: true // Set default values if a new document is created
        };

        // Perform the findOneAndUpdate operation
        await Eruption.findOneAndUpdate(query, newEruption, options);

        res.status(200).json({ success: true, message: 'Eruption added successfully' });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Deletes an Eruption document by ID.
 * @param {Object} req - The request object containing the Eruption ID.
 * @param {Object} res - The response object.
 */
const remove = async (req, res) => {
    // Extract the ID from the request parameters
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, error: 'No such eruption' });
    }

    try {
        // Delete the Eruption document by ID
        await Eruption.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Eruption deleted successfully' });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

module.exports = {
    get,
    add,
    remove
};