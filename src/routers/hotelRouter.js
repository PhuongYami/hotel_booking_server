const Router = require('express');
const { createHotel, getHotels } = require('../controllers/hotelController');

const hotelRouter = Router();

hotelRouter.post('/createHotel', createHotel);
hotelRouter.get('/getHotels', getHotels);


module.exports = hotelRouter;