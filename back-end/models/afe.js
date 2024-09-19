const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const oxygen_fugacity = require('../enums/oxygen_fugacity')

/**
 * AFE Schema: Defines the structure of the 'afes' (Ash Forming Events) collection in MongoDB.
 */
const afeSchema = new Schema({
    afe_code: {
        required: true, // afe_code is a required field
        type: String    // afe_code is of type String
    },
    afe_date: {
        required: true, // afe_date is a required field
        type: Date      // afe_date is of type Date
    },
    afe_end_date: {
        type: Date      // afe_end_date is of type Date
    },
    eruptive_style: {
        required: true, // eruptive_style is a required field
        type: String    // eruptive_style is of type String
    },
    volc_num: {
        required: true, // volc_num is a required field
        type: Number    // volc_num is of type Number
    },
    afe_lat: {
        required: true, // afe_lat (latitude)  is a required field
        type: String    // afe_lat (latitude) is of type String
    },
    afe_lon: {
        required: true, // afe_lon (longitude) is a required field
        type: String    // afe_lon (longitude) is of type String
    },
    temperature_lower_bound: {
        type: Number    // temperature_lower_bound is of type Number
    },
    temperature_upper_bound: {
        type: Number    // temperature_upper_bound is of type Number
    },
    oxygen_fugacity: {
        enum: oxygen_fugacity,  // oxygen_fugacity must be either 'low' or 'high'
        type: String            // oxygen_fugacity is of type String
    },
    experiment_duration: {
        type: Number    // experiment_duration is of type Number
    }
}, {
    collection: 'afes', // Collection name in MongoDB
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export the AFE model using the schema
const AFE = mongoose.model('afes', afeSchema);

module.exports = { AFE };
