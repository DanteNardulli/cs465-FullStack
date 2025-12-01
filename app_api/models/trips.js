const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  length: { type: Number, required: true },
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: Number, required: true },
  image: { type: String },
  description: { type: String }
});

// Only define model if it doesn’t already exist
module.exports = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
