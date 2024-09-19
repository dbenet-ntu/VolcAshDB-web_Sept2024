const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Eruption Schema: Defines the structure of the 'eruptions' collection in MongoDB.
 * This schema tracks details of each eruption in the system, following Smithsonian database schema:
 * - https://doi.org/10.5479/si.GVP.VOTW5-2024.5.2
 */
const eruptionSchema = new Schema({
    ed_area: {
        required: true, // ed_area is a required field
        type: String    // Area where the eruption occurred
    },
    ed_category: {
        required: true, // ed_category is a required field
        type: String    // Category of the eruption
    },
    ed_code: {
        required: true, // ed_code is a required field
        type: String    // Code identifying the eruption
    },
    ed_endday_mod: {
        required: true, // ed_endday_mod is a required field
        type: String    // Modified end day of the eruption
    },
    ed_endday_unc: {
        required: true, // ed_endday_unc is a required field
        type: Number    // Uncertainty in end day of the eruption
    },
    ed_endyear_mod: {
        required: true, // ed_endyear_mod is a required field
        type: String    // Modified end year of the eruption
    },
    ed_endyear_unc: {
        required: true, // ed_endyear_unc is a required field
        type: Number    // Uncertainty in end year of the eruption
    },
    ed_etime: {
        required: true, // ed_etime is a required field
        type: Date      // Exact time of the eruption
    },
    ed_evidence: {
        required: true, // ed_evidence is a required field
        type: String    // Evidence supporting the eruption data
    },
    ed_latitude: {
        required: true, // ed_latitude is a required field
        type: Number    // Latitude of the eruption location
    },
    ed_longitude: {
        required: true, // ed_longitude is a required field
        type: Number    // Longitude of the eruption location
    },
    ed_num: {
        required: true, // ed_num is a required field
        type: Number    // Number or identifier for the eruption
    },
    ed_startday_mod: {
        required: true, // ed_startday_mod is a required field
        type: String    // Modified start day of the eruption
    },
    ed_startday_unc: {
        required: true, // ed_startday_unc is a required field
        type: Number    // Uncertainty in start day of the eruption
    },
    ed_startyear_mod: {
        required: true, // ed_startyear_mod is a required field
        type: String    // Modified start year of the eruption
    },
    ed_startyear_unc: {
        required: true, // ed_startyear_unc is a required field
        type: Number    // Uncertainty in start year of the eruption
    },
    ed_stime: {
        required: true, // ed_stime is a required field
        type: Date      // Exact time when the eruption started
    },
    ed_VEI: {
        required: true, // ed_VEI is a required field
        type: Number    // Volcanic Explosivity Index (VEI) for the eruption
    },
    ed_VEI_mod: {
        required: true, // ed_VEI_mod is a required field
        type: String    // Modified VEI for the eruption
    },
    ed_yearsBP: {
        required: true, // ed_yearsBP is a required field
        type: Number    // Number of years before present (BP) when the eruption occurred
    },
    ed_yearsBP_unc: {
        required: true, // ed_yearsBP_unc is a required field
        type: Number    // Uncertainty in the number of years before present
    },
    in_GVP: {
        required: true, // in_GVP is a required field
        type: Boolean   // Indicates if the eruption is included in the Global Volcanism Program (GVP)
    },
    volc_name: {
        required: true, // volc_name is a required field
        type: String    // Name of the volcano
    },
    volc_num: {
        required: true, // volc_num is a required field
        type: Number    // Number identifying the volcano
    }
}, {
    collection: 'eruptions', // Collection name in MongoDB
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export the Eruption model using the schema
const Eruption = mongoose.model("Eruption", eruptionSchema);

module.exports = { Eruption };
