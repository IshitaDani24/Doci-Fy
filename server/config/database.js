const mongoose = require('mongoose');

const connectDatabase = () => {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
        console.error('DB_URL is not set in environment variables');
        process.exit(1);
    }

    mongoose.connect(dbUrl)
        .then(() => {
            console.log('MongoDB connection established successfully', process.env.DB_URL);
            console.log('MongoDB connection established successfully', process.env.PORT);
        })
        .catch((error) => {
            console.error(`Database connection error: ${error.message}`);
            process.exit(1);
        });
};

module.exports = connectDatabase;