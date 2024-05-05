const Router = require('express').Router;

const authRouter = Router();
authRouter.get('/hello', (req, res) =>
{
    res.send('Hello World!');
});

module.exports = authRouter;