const mongoose = require('mongoose');
const configure = require('../bootstrap/config');

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to database successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.log("Error in connecting to database.", err);
        });

        await mongoose.connect(configure?.databaseUrl);
    } catch (err) {
        console.error("Failed to connect to database.", err);
        process.exit(1);
    }
};

module.exports = connectDB;