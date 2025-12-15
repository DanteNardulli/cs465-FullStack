const express = require('express');
const router = express.Router();

// Controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/auth');

// Middleware
const requireAuth = require('../middleware/auth');

/*
 * AUTH ROUTES
 * Used by Angular admin + Postman
 */
router.post('/register', authController.register); // mock admin user
router.post('/login', authController.login);       // returns JWT


/*
 * TRIPS ROUTES
 */

// Public – anyone can view trips
router.get('/trips', tripsController.tripsList);

// Protected – admin only
router.post('/trips', requireAuth, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', requireAuth, tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', requireAuth, tripsController.tripsDeleteTrip);

module.exports = router;
