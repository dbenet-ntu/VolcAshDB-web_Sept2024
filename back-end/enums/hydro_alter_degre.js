/**
 * Defines and exports the possible hydro_alter_degree values meaning that the alteration occurs within the hydrothermal system.
 * These constants represent the allowed hydro_alter_degree options.
 */
const hydro_alter_degree = {
    UNDEFINED: '',        // Undefined or no value
    NONE: 'none',         // No hydro alteration
    LOW: 'low',           // Low hydro alteration
    MEDIUM: 'medium',     // Medium hydro alteration
    HIGH: 'high',         // High hydro alteration
};

// Export the hydro alteration degree constants for use in other modules
module.exports = hydro_alter_degree;
