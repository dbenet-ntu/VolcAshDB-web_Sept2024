const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Volcano Schema: Defines the structure of the 'volcanos' collection in MongoDB.
 * This schema tracks details of each volcano in the system, following Smithsonian database schema:
 * https://doi.org/10.5479/si.GVP.VOTW5-2024.5.2
 */
const volcanoSchema = new Schema({
    imgURL: {
        type: String    // Filename of the particle image of the volcano is of type String
    },
    mj_rock1: {
        type: String    // Major rock type 1 is of type String
    },
    mj_rock2: {
        type: String    // Major rock type 2 is of type String
    },
    mj_rock3: {
        type: String    // Major rock type 3 is of type String
    },
    mj_rock4: {
        type: String    // Major rock type 4 is of type String
    },
    mj_rock5: {
        type: String    // Major rock type 5 is of type String
    },
    mn_rock1: {
        type: String    // Minor rock type 1 is of type String
    },
    mn_rock2: {
        type: String    // Minor rock type 2 is of type String
    },
    mn_rock3: {
        type: String    // Minor rock type 3 is of type String
    },
    mn_rock4: {
        type: String    // Minor rock type 4 is of type String
    },
    mn_rock5: {
        type: String    // Minor rock type 5 is of type String
    },
    tectonic_settings: {
        type: String    // Tectonic settings related to the volcano is of type String
    },   
    volc_cavw: {
        type: String    // volc_cavw is of type String
    },
    volc_code: {
        type: String    // Unique code identifying the volcano is of type String
    },
    volc_com: {
        type: String    // Additional comments or notes about the volcano is of type String
    },
    volc_country: {
        type: String    // Country where the volcano is located is of type String
    },
    volc_desc: {
        type: String    // Description of the volcano is of type String
    },
    volc_evol: {
        type: String    // Evolution of the volcano over time is of type String
    },
    volc_inf_com: {
        type: String    // Information comments about the volcano is of type String
    },
    volc_lcald_dia: {
        type: String    // Diameter of the caldera is of type String
    },
    volc_loc: {
        type: String    // Location details of the volcano is of type String
    },
    volc_mcount: {
        type: String    // volc_mcount is of type String
    },
    volc_name: {
        required: true, // Name of the volcano, which is a mandatory field 
        type: String    // Volcano name is of type String
    },
    volc_name2: {
        type: String    // Alternative name of the volcano is of type String
    },
    volc_num: {
        required: true, // Volcano number, which is a mandatory field
        type: Number    // Number or identifier for the volcano is of type Number
    },
    volc_numcald: {
        type: String    // volc_numcald is of type String
    },
    volc_rtype: {
        type: String    // Rock type or volcanic rock type is of type String
    },
    volc_selev: {
        type: String    // Elevation of the volcano is of type String
    },
    volc_slat: {
        type: String    // Latitude of the volcano is of type String
    },
    volc_slon: {
        type: String    // Longitude of the volcano is of type String
    },
    volc_status: {
        type: String    // Status of the volcano is of type String
    },
    volc_subreg: {
        type: String    // Subregion where the volcano is located is of type String
    },
    volc_type: {
        type: String    // Type of volcano is of type String
    },
    volc_tzone: {
        type: String    // Time zone of the volcano's location is of type String
    },
    volc_ycald_lat: {
        type: String    // Latitude of the caldera's location is of type String
    },
    volc_ycald_lon: {
        type: String    // Longitude of the caldera's location is of type String
    }
}, {
    collection: 'volcanos', // Collection name in MongoDB
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export the Volcano model using the schema
const Volcano = mongoose.model('Volcano', volcanoSchema);

module.exports = { Volcano };