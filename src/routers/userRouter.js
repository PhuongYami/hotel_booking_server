const Router = require('express');
const { getUserInfo, updateInfo } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/getUserInfo', getUserInfo);
userRouter.put('/updateInfo', updateInfo);

module.exports = userRouter;