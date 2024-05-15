const Router = require('express');
const { createHotel } = require('../controllers/hotelController');

const hotelRouter = Router();

hotelRouter.post('/createHotel', createHotel);


module.exports = hotelRouter;