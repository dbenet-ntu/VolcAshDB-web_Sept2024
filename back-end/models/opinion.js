const mongoose = require('mongoose');

const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const colors = require('../enums/colors');
const crystallinity = require('../enums/crystallinity');
const edge = require('../enums/edge');
const hydro_alter_degree = require('../enums/hydro_alter_degre');
const luster = require("../enums/luster");
const shape = require("../enums/shape");

/**
 * Opinion Schema: Defines the structure of the 'opinions' collection in MongoDB.
 * It captures user opinions about particle attributes.
 */
const opinionSchema = new Schema({
    color: {
        enum: colors,               // Enum for colors levels
        type: String                // Color is of type String
    },
    comments: {
        type: String                // User's additional comments is of type String
    },
    crystallinity: {
        enum: crystallinity,        // Enum for crystallinity levels
        type: String                // Crystallinity is of type String
    },
    edge: {
        enum: edge,                 // Enum for edge characteristics
        type: String                // Edge is of type String
    },
    hydro_alter_degree: {
        enum: hydro_alter_degree,   // Enum for degree of hydrothermal alteration
        type: String                // hydro_alter_degree is of type String
    },
    luster: {
        enum: luster,               // Enum for luster types
        type: String                // Luster is of type String
    },
    /**
     * Main type: Categorizes the material into one of four main types.
     * Each category has a value range between 0 and 100.
     */
    main_type: {
        "altered material": {
            max: 100,               // Maximum value for "altered material"
            min: 0,                 // Minimum value for "altered material"
            type: Number            // Altered material is of type String
        },
        "free crystal": {
            max: 100,               // Maximum value for "free crystal"
            min: 0,                 // Minimum value for "free crystal"
            type: Number            // Free crystal is of type String
        },
        "juvenile": {
            max: 100,               // Maximum value for "juvenile"
            min: 0,                 // Minimum value for "juvenile"
            type: Number            // Juvenile is of type String
        },
        "lithic": {
            max: 100,               // Maximum value for "lithic"
            min: 0,                 // Minimum value for "lithic"
            type: Number            // Lithic is of type String
        }
    },
    particleId: {
        required: true,             // particleId is required to associate the opinion with a particle
        type: ObjectId              // Reference to the associated particle's ID
    },
    shape: {
        enum: shape,                // Enum for possible particle shapes
        type: String                // Shape is of type String
    },
    userId: {
        required: true,             // userId is required to identify the user who gave the opinion
        type: ObjectId              // Reference to the user's ID
    },
    weathering_sign: {
        type: Boolean               // Indicates whether there are signs of weathering
    }
}, {
    collection: 'opinions', // Collection name in MongoDB
    timestamps: true        // Automatically manage `createdAt` and `updatedAt` timestamps
});

/**
 * Static method to add or update an opinion for a given user and particle.
 * If an opinion already exists, it updates the existing one. Otherwise, it creates a new one.
 * 
 * @param {ObjectId} userId - The ID of the user.
 * @param {ObjectId} particleId - The ID of the particle.
 * @param {Object} main_type - The main type of the material.
 * @param {String} comments - Additional comments.
 * @param {String} color - Color of the material.
 * @param {String} luster - Luster characteristic.
 * @param {String} edge - Edge characteristic.
 * @param {String} shape - Shape of the material.
 * @param {String} crystallinity - Crystallinity level.
 * @param {String} hydro_alter_degree - Degree of hydrothermal alteration.
 * @param {Boolean} weathering_sign - Whether there are signs of weathering.
 */
opinionSchema.statics.addOpinion = async function(
    userId, 
    particleId, 
    main_type, 
    comments,
    color,
    luster,
    edge,
    shape,
    crystallinity,
    hydro_alter_degree,
    weathering_sign
) {
    // Check if an opinion for this user and particle already exists
    const exists = await this.findOne({ userId, particleId });

    if (exists) {
        // If the opinion exists, update it with the new data
        await this.findOneAndUpdate(
            { userId, particleId },
            { main_type, comments, color, luster, edge, shape, crystallinity, hydro_alter_degree, weathering_sign },
            { runValidators: true } // Ensure the updated fields pass validation
        );
    } else {
        // If no opinion exists, create a new one
        await this.create(
            { userId, particleId, main_type, comments, color, luster, edge, shape, crystallinity, hydro_alter_degree, weathering_sign }
        );
    }
};

// Create the Opinion model based on the schema and export it
const Opinion = mongoose.model('Opinion', opinionSchema);

module.exports = { Opinion };