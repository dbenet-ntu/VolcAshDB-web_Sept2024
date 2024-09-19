const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { logRequest } = require('./controllers/requestController');
const cronJobs = require('./utils/cronJobs'); // Initialize cron jobs

// Import routes
const volcanoesRouter = require('./routes/volcano');
const usersRouter = require('./routes/user');
const eruptionsRouter = require('./routes/eruption');
const afesRouter = require('./routes/afe');
const particlesRouter = require('./routes/particle');
const opinionsRouter = require('./routes/opinion');
const statsRoutes = require('./routes/request');

// Load environment variables from .env file
require('dotenv').config();

// Create an Express application
const app = express();

// Middleware setup
app.use(cookieParser()); // Parse cookies
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '50mb' })); // Parse JSON bodies with a size limit of 50mb
app.use(express.urlencoded({ limit: '50mb' })); // Parse URL-encoded bodies with a size limit of 50mb

// Serve static files
app.use('/images', express.static('images')); // Serve static files from the "images" directory
app.use('/uploads', express.static('uploads')); // Serve static files from the "uploads" directory

// Log requests for debugging or analytics
app.use(logRequest);

// Define API routes
app.use('/volcano', volcanoesRouter);
app.use('/user', usersRouter);
app.use('/eruption', eruptionsRouter);
app.use('/afe', afesRouter);
app.use('/particle', particlesRouter);
app.use('/opinion', opinionsRouter);
app.use('/stats', statsRoutes);

// Server and database configuration
const port = process.env.PORT; // Port for the server
const uri = process.env.ATLAS_URI; // MongoDB connection URI

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Connect to MongoDB
mongoose.connect(uri);
mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});
