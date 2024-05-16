const Router = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');

const bookingRouter = Router();

bookingRouter.post('/createBooking', createBooking);
bookingRouter.get('/getBookings', getBookings);


module.exports = bookingRouter;