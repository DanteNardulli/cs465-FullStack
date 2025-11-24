// app_server/config/db.js
const mongoose = require('mongoose');

async function connectDB(uri) {
    if (!uri) throw new Error('MongoDB URI not provided to connectDB');

    try {
        await mongoose.connect(uri);  // <- no options needed
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

module.exports = { connectDB, mongoose };
