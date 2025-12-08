const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// GET all trips
router.get('/trips', tripsController.tripsList);

// POST create trip
router.post('/trips', tripsController.tripsAddTrip);

// PUT update trip
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);

// DELETE trip
router.delete('/trips/:tripCode', tripsController.tripsDeleteTrip);

module.exports = router;
