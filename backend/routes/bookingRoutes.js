const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookingsByEmail);
router.get('/expert/:expertId', bookingController.getBookingsByExpert); // THIS IS THE ONE FIXING THE ERROR

module.exports = router;