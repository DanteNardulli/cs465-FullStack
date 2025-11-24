// app_server/models/Trip.js
const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },
    days: { type: Number, required: true, min: 1 },
    summary: { type: String, trim: true },
    code: { type: String, trim: true, unique: true, required: true }
}, {
    timestamps: true
});

module.exports = model('Trip', tripSchema);
