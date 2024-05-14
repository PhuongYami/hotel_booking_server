const Router = require('express');
const { searchLocation, searchHotels } = require('../controllers/serviceController');
const serviceRouter = Router();

// Route để tìm kiếm địa điểm
serviceRouter.get('/locations', searchLocation);
serviceRouter.get('/searchHotels', searchHotels);

module.exports = serviceRouter;