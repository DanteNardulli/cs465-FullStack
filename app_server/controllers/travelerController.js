const Trip = require('../models/Trip');
const fs = require('fs');
const path = require('path');

class TravelerController {
    static getIndex(req, res) {
        // existing index behaviour (hero + featured maybe)
        const model = {
            title: 'Travlr — Explore the World',
            hero: {
                heading: 'Find your next great escape',
                subheading: 'Search, compare, and book the best trips.'
            }
        };
        res.render('travelers/index', { title: 'Travlr — Explore the World' })
    }

    // New: render trips list from JSON
    static async getTrips(req, res) {
        try {
            const trips = await Trip.find({}).sort({ price: 1 }).lean();
            res.render('travelers/trips', {
                title: 'Available Trips',
                trips
            });
        } catch (err) {
            console.error('Error fetching trips from DB:', err);
            res.status(500).send('Server error retrieving trips.');
        }
    }

    // Optional: expose JSON API
    static async apiTrips(req, res) {
        try {
            const trips = await Trip.find({}).lean();
            res.json({ trips });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = TravelerController;
