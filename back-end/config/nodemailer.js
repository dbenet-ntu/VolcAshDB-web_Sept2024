// Import the nodemailer package for sending emails
const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport configuration
const transporter = nodemailer.createTransport({
    /**
     * SMTP server hostname or IP address.
     * 'localhost' is used here for a local SMTP server setup.
     */
    host: "localhost",
    
    /**
     * Port number to connect to the SMTP server.
     * Port 25 is typically used for unencrypted connections.
     */
    port: 25,

    /**
     * Indicates whether to use a secure connection (SSL/TLS).
     * Set to false for port 25 as it does not use SSL/TLS.
     */
    secure: false,

    /**
     * Disables the use of STARTTLS command to upgrade the connection to a secure one.
     * Ignored when 'secure' is set to true.
     */
    ignoreTLS: true,

    /**
     * Enables debug mode to print detailed logs of the SMTP communication.
     * Useful for troubleshooting and debugging.
     */
    debug: true,
});

// Export the transporter object for use in other modules
module.exports = transporter;
