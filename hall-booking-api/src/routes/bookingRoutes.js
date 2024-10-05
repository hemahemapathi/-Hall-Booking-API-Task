const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.get('/customers', bookingController.getAllCustomers);
router.get('/customers/:customerId', bookingController.getCustomerBookings);

module.exports = router;
