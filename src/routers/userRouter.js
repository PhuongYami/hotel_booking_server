const Router = require('express');
const { getUserInfo, updateInfo, updateRole, deleteUser } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/getUserInfo', getUserInfo);
userRouter.put('/updateInfo', updateInfo);
userRouter.put('/updateRole', updateRole);
userRouter.delete('/deleteUser', deleteUser);


module.exports = userRouter;