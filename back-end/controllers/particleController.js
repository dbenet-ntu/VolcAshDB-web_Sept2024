const { default: mongoose } = require('mongoose');
const { Particle } = require('../models/particle');
const { AFE } = require('../models/afe');

/**
 * Retrieves particles excluding those with faulty images and includes AFE and volcano details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const get = async (req, res) => {
    try {
        const particles = await Particle.aggregate([
            {
                $match: {
                    faulty_image: { $ne: true } // Exclude particles with faulty images
                }
            },
            {
                $lookup: {
                    from: 'afes', // Lookup AFE details from the 'afes' collection
                    localField: 'afe_code',
                    foreignField: 'afe_code',
                    as: 'afe_details'
                }
            },
            {
                $unwind: {
                    path: '$afe_details',
                    preserveNullAndEmptyArrays: true // Keep particles even if they have no AFE details
                }
            },
            {
                $addFields: {
                    eruptive_style: '$afe_details.eruptive_style',
                    afe_date: '$afe_details.afe_date',
                    afe_dateBP: '$afe_details.afe_dateBP',
                    afe_lat: '$afe_details.afe_lat',
                    afe_lon: '$afe_details.afe_lon',
                    temperature_lower_bound: '$afe_details.temperature_lower_bound',
                    temperature_upper_bound: '$afe_details.temperature_upper_bound',
                    oxygen_fugacity: '$afe_details.oxygen_fugacity',
                    experiment_duration: '$afe_details.experiment_duration'
                }
            },
            {
                $project: {
                    afe_details: 0 // Exclude the original 'afe_details' field from the result
                }
            },
            {
                $lookup: {
                    from: 'volcanos', // Lookup volcano details from the 'volcanos' collection
                    localField: 'volc_num',
                    foreignField: 'volc_num',
                    as: 'volc_details'
                }
            },
            {
                $unwind: {
                    path: '$volc_details',
                    preserveNullAndEmptyArrays: true // Keep particles even if they have no volcano details
                }
            },
            {
                $addFields: {
                    volc_lat: '$volc_details.volc_slat',
                    volc_lon: '$volc_details.volc_slon'
                }
            },
            {
                $project: {
                    volc_details: 0 // Exclude the original 'volc_details' field from the result
                }
            }
        ]);

        res.status(200).json({ success: true, particles });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Retrieves distinct tag values from both particles and AFE documents.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getTags = async (req, res) => {
    try {
        const tags = {};

        // Define fields of interest for tags
        const fields = [
            'volcanoName', 'eruptions', 'eruptiveStyle', 'grainSize', 
            'mainType', 'shape', 'crystallinity', 'color', 
            'hydroAlterDegree', 'juvenileType', 'lithicType', 
            'alteredMaterialType', 'freeCrystalType'
        ];

        // Function to get distinct values from a collection and field
        const getDistinctValues = async (model, field) => {
            const values = await model.distinct(field);
            return values;
        };

        // Process particles collection
        const particleFields = {
            volcanoName: 'volcano_name',
            eruptiveStyle: 'eruptive_style',
            grainSize: 'grain_size',
            mainType: 'main_type',
            shape: 'shape',
            crystallinity: 'crystallinity',
            color: 'color',
            hydroAlterDegree: 'hydro_alter_degree',
            juvenileType: 'juvenile_type',
            lithicType: 'lithic_type',
            alteredMaterialType: 'altered_material_type',
            freeCrystalType: 'free_crystal_type'
        };

        for (const [key, field] of Object.entries(particleFields)) {
            const choices = await getDistinctValues(Particle, field);
            tags[key] = {
                id: fields.indexOf(key) + 1,
                oriTag: key.replace(/([A-Z])/g, ' $1').trim(), // Format tag name for display
                choices
            };
        }

        // Process AFE collection
        const afesFields = {
            eruptiveStyle: 'eruptive_style',
            grainSize: 'grain_size',
            mainType: 'main_type',
            shape: 'shape',
            crystallinity: 'crystallinity',
            color: 'color',
            hydroAlterDegree: 'hydro_alter_degree',
            juvenileType: 'juvenile_type',
            lithicType: 'lithic_type',
            alteredMaterialType: 'altered_material_type',
            freeCrystalType: 'free_crystal_type'
        };

        for (const [key, field] of Object.entries(afesFields)) {
            const choices = await getDistinctValues(AFE, field);
            if (!tags[key]) {
                tags[key] = {
                    id: fields.indexOf(key) + 1,
                    oriTag: key.replace(/([A-Z])/g, ' $1').trim(), // Format tag name for display
                    choices
                };
            } else {
                // Merge choices from both particles and AFE collections
                tags[key].choices = [...new Set([...tags[key].choices, ...choices])];
            }
        }

        res.status(200).json({ success: true, tags });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Retrieves specific example particles based on image URLs.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getExamples = async (req, res) => {
    try {
        const particles = await Particle.aggregate([
            {
                $match: {
                    imgURL: {
                        $in: [
                            "PI-DB1_01_2_21_mf_5x_phi0phi1_AMF.png",
                            "ME-DB1_01_1_5_mf_5x_phi0phi1_LLtrmcn.png",
                            "TO-DB1_01_1_46_mf_5x_phi0phi1_PG.png",
                            "SG-DB1_3_03_48_mf_5x_phi0phi1_AW.png",
                            "ON-DB1_01_1_3_mf_5x_phi0phi1_AHh.png",
                            "NC-DB2_01_1_82_mf_5x_phi0phi1_AHm.png",
                            "MS-DB1_01_1_2_mf_5x_phi0phi1_JJtrlcp.png",
                            "KE-DB2_01_2_4_mf_5x_phi1phi2_JJtrlcp.png",
                            "CV-DB1_01_1_2_mf_5x_phi0phi1_JJtrlcf.png"
                        ]
                    }
                }
            }
        ]);

        res.status(200).json({ success: true, particles });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Retrieves the total number of particles in the collection.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getTotalParticles = async (req, res) => {
    try {
        const particleCount = await Particle.countDocuments();
        
        res.status(200).json({ totalParticles: particleCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch total particles' });
    }
};

/**
 * Adds a new particle document to the collection.
 * @param {Object} req - The request object containing the new particle data.
 * @param {Object} res - The response object.
 */
const add = async (req, res) => {
    try {
        const newParticle_ = new Particle(req.body);
        
        await newParticle_.save();
        
        res.status(200).json({ success: true, message: 'Particle added successfully' });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Removes a particle document by ID.
 * @param {Object} req - The request object containing the particle ID in the parameters.
 * @param {Object} res - The response object.
 */
const remove = async (req, res) => {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, error: 'No such particle' });
    }

    try {
        await Particle.findByIdAndDelete(id);
        
        res.status(200).json({ success: true, message: 'Particle deleted successfully' });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

/**
 * Updates a particle document based on a filter and update criteria.
 * @param {Object} req - The request object containing filter and update data.
 * @param {Object} res - The response object.
 */
const update = async (req, res) => {
    try {
        const { filter, update } = req.body;
        const options = {
            upsert: true, // Create a new document if no document matches the filter
            new: true, // Return the modified document
            setDefaultsOnInsert: true // Set default values for fields on insert
        };

        await Particle.findOneAndUpdate(filter, update, options);
        
        res.status(200).json({ success: true, message: 'Particle updated successfully' });
    } catch (error) {
        res.status(404).json({ success: false, error: error.message });
    }
};

module.exports = {
    get,
    getTags,
    getExamples,
    getTotalParticles,
    add,
    remove,
    update
};