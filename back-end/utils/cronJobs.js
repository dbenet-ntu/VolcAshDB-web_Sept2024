const cron = require('node-cron');
const { User } = require('../models/user');

// Schedule a cron job to run daily at midnight
cron.schedule('0 0 * * *', async () => {
    // Calculate the threshold date for inactivity (24 hours ago)
    const threshold = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
        // Delete users who have been inactive for more than 24 hours
        await User.deleteMany({
            status: 'INACTIVE',
            createdAt: { $lt: threshold }
        });
        
        console.log('Successfully deleted inactive users');
    } catch (error) {
        // Log any errors that occur during the delete operation
        console.error('Error deleting inactive users:', error);
    }
});
