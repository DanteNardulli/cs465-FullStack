const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// routes for API
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

module.exports = router;
