require('dotenv').config(); // optional if using .env
const path = require('path');
const fs = require('fs');
const { connectDB } = require('../app_server/config/db');
const Trip = require('../app_server/models/Trip');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/travlr';

async function seed() {
    try {
        await connectDB(MONGO_URI);

        const dataPath = path.join(__dirname, '..', 'app_server', 'data', 'trips.json');
        const json = fs.readFileSync(dataPath, 'utf8');
        const parsed = JSON.parse(json);

        if (!parsed.trips || !Array.isArray(parsed.trips)) {
            console.error('Invalid trips.json format: missing "trips" array');
            process.exit(1);
        }

        await Trip.deleteMany({});
        console.log('Cleared Trip collection');

        const docs = parsed.trips.map((t, i) => ({
            name: t.name || `Trip ${i + 1}`,
            price: Number(t.price || 0),
            currency: t.currency || 'USD',
            days: t.days || t.length || 1,
            summary: t.summary || '',
            code: t.code || `T${Math.floor(Math.random() * 1e6)}`
        }));

        await Trip.insertMany(docs);
        console.log(`Inserted ${docs.length} trips`);

        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
