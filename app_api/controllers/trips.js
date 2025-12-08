const Trip = require('../models/trips');

// ✅ TEMPORARY DEBUG – proves which schema is active
console.log(
    'ACTIVE Trip schema fields:',
    Object.keys(Trip.schema.paths)
);

// GET all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find().exec();
        res.status(200).json({ trips });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving trips', error: err });
    }
};

// POST create trip
const tripsAddTrip = async (req, res) => {
    console.log('POST BODY:', req.body); // ✅ debug

    try {
        const trip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            description: req.body.description
        });

        const savedTrip = await trip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        res.status(400).json({ message: 'Create failed', error: err });
    }
};

// PUT update trip
const tripsUpdateTrip = async (req, res) => {
    console.log('PUT BODY:', req.body); // ✅ debug

    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                description: req.body.description
            },
            { new: true, runValidators: true }
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json(updatedTrip);
    } catch (err) {
        res.status(400).json({ message: 'Update failed', error: err });
    }
};

// DELETE trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const deleted = await Trip.findOneAndDelete({
            code: req.params.tripCode
        }).exec();

        if (!deleted) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Delete failed', error: err });
    }
};

module.exports = {
    tripsList,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
