const crypto = require("crypto");

/**
 * Generates a random string of specified length using cryptographic random numbers.
 * 
 * @param {number} length - The length of the random string to generate.
 * @returns {string} - A random string of the specified length.
 */
const randomString = (length) => {
    return Array.from({ length }, () => crypto.randomInt(10).toString()).join('');
}

module.exports = { randomString };