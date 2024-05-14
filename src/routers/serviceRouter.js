const Router = require('express');
const { searchLocation } = require('../controllers/serviceController');

const serviceRouter = Router();

// Route để tìm kiếm địa điểm
serviceRouter.get('/locations', searchLocation);

module.exports = serviceRouter;