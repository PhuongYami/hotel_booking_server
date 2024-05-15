const Router = require('express');
const { getUserInfo, updateInfo, updateRole } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/getUserInfo', getUserInfo);
userRouter.put('/updateInfo', updateInfo);
userRouter.put('/updateRole', updateRole);


module.exports = userRouter;