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
        res.render('travelers/index', model);
    }

    // New: render trips list from JSON
    static getTrips(req, res) {
        const dataPath = path.join(__dirname, '..', 'data', 'trips.json');
        fs.readFile(dataPath, 'utf8', (err, jsonString) => {
            if (err) {
                console.error('Error reading trips.json:', err);
                return res.status(500).send('Server error reading trips data.');
            }
            try {
                const data = JSON.parse(jsonString);
                // pass trips array to the HBS view
                res.render('travelers/trips', {
                    title: 'Available Trips',
                    trips: data.trips
                });
            } catch (parseErr) {
                console.error('Error parsing trips.json:', parseErr);
                return res.status(500).send('Server error parsing trips data.');
            }
        });
    }
}

module.exports = TravelerController;
