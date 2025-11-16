const express = require('express');
const router = express.Router();
const TravelerController = require('../controllers/travelerController');

router.get('/', TravelerController.getIndex);
router.get('/trips', TravelerController.getTrips);

module.exports = router;
