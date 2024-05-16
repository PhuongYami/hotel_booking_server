const Router = require('express');
const { getRoomDetails } = require('../controllers/roomController');

const roomRouter = Router();

roomRouter.get('/getRoomDetails', getRoomDetails);


module.exports = roomRouter;