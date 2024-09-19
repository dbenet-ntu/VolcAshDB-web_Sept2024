/**
 * Defines and exports the possible edge values.
 * These constants represent the allowed edge options.
 */
const edge = {
    UNDEFINED: '',                                  // Undefined or no value
    ANGULAR: 'angular',                             // Angular edge
    SUBANGULER_SUBROUNDED: 'subangular/subrounded', // subangular/subrounded edge
    ROUNDED_WELL_ROUNDED: 'rounded/well rounded',   // rounded/well rounded edge
};

// Export the edge constants for use in other modules
module.exports = edge;
