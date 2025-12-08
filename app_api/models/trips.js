const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    length: { type: Number, required: true },
    start: { type: Date },
    resort: { type: String, required: true },
    perPerson: { type: Number, required: true },
    description: { type: String }
});

module.exports = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
