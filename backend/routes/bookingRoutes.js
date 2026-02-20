const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Make sure these match the frontend calls exactly
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookingsByEmail);
router.get('/expert/:expertId', bookingController.getBookingsByExpert);

module.exports = router;