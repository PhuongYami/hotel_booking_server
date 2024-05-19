const Router = require('express');
const { createHotel, getHotels, updateHotel } = require('../controllers/hotelController');

const hotelRouter = Router();

hotelRouter.post('/createHotel', createHotel);
hotelRouter.get('/getHotels', getHotels);
hotelRouter.put('/updateHotel', updateHotel);


module.exports = hotelRouter;