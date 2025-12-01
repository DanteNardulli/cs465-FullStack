require('dotenv').config();
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Trip = require('../app_api/models/trips');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@<cluster-url>/travlr?retryWrites=true&w=majority';

async function seed() {
  try {
    // Remove the old options
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    const dataPath = path.join(__dirname, '..', 'app_server', 'data', 'trips.json');
    const json = fs.readFileSync(dataPath, 'utf8');
    const parsed = JSON.parse(json);

    if (!parsed.trips || !Array.isArray(parsed.trips)) {
      console.error('Invalid trips.json format');
      process.exit(1);
    }

    // Clear existing collection
    await Trip.deleteMany({});
    console.log('Cleared Trip collection');

    await Trip.insertMany(parsed.trips);
    console.log(`Inserted ${parsed.trips.length} trips`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
