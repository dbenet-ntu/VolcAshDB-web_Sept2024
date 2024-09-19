const { default: mongoose } = require('mongoose');
const { Volcano } = require('../models/volcano');

/**
 * Retrieves all volcano records from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the response.
 */
const get = async (req, res) => {
    try {
        // Fetch all volcano records
        const volcanoes = await Volcano.find();
        
        res.status(200).json({ success: true, volcanoes });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Retrieves volcano records that have associated AFE records.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send the response.
 */
const getVolcStd = async (req, res) => {
    try {
        // Aggregate volcano records with associated AFE records
        const volcanoes = await Volcano.aggregate([
            {
                $lookup: {
                    from: "afes",  // Collection to join with
                    localField: "volc_num",  // Field from the volcano collection
                    foreignField: "volc_num", // Field from the afes collection
                    as: "afe_code"  // Alias for the joined records
                }
            },
            {
                $match: {
                    afe_code: { 
                        $exists: true,  // Ensure the field exists
                        $ne: []  // Ensure the field is not an empty array
                    }
                }
            }
        ]);

        res.status(200).json({ success: true, volcanoes });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Adds a new volcano record to the database.
 * @param {Object} req - The request object containing the new volcano data.
 * @param {Object} res - The response object used to send the response.
 */
const add = async (req, res) => {
    try {
        // Create a new volcano instance with the request body
        const newVolcano = new Volcano(req.body);

        // Save the new volcano to the database
        await newVolcano.save();
        
        res.status(200).json({ success: true, message: 'Volcano added successfully' });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Updates an existing volcano record in the database.
 * @param {Object} req - The request object containing filter and update data.
 * @param {Object} res - The response object used to send the response.
 */
const update = async (req, res) => {
    const filter = req.body.filter;  // Criteria to find the record
    const update = req.body.update;  // Data to update the record
    const options = {
        new: true,  // Return the updated document
        useFindAndModify: false  // Use native findOneAndUpdate
    };

    try {
        // Find and update the volcano record
        await Volcano.findOneAndUpdate(filter, update, options);
        
        res.status(200).json({ success: true, message: 'Volcano updated successfully' });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Deletes a volcano record from the database by its ID.
 * @param {Object} req - The request object containing the volcano ID.
 * @param {Object} res - The response object used to send the response.
 */
const remove = async (req, res) => {
    const { id } = req.params;  // Extract ID from request parameters

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, error: 'No such volcano' });
    }

    try {
        // Find and delete the volcano record by ID
        await Volcano.findByIdAndDelete(id);
        
        res.status(200).json({ success: true, message: 'Volcano deleted successfully' });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Retrieves volcano records by their number.
 * @param {Object} req - The request object containing the volcano number as a query parameter.
 * @param {Object} res - The response object used to send the response.
 */
const getVolcNum = async (req, res) => {
    const volc_num = req.query.volc_num;  // Extract volcano number from query parameters

    try {
        // Find volcano records by number
        const volcano = await Volcano.find({ 'volc_num': volc_num });
        
        res.status(200).json({ success: true, volcano });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

module.exports = {
    get, 
    getVolcStd,
    getVolcNum,
    add,
    update,
    remove
};