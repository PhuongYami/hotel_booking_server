const Router = require('express').Router;

const authRouter = Router();
authRouter.post('/register', (req, res) =>
{
    console.log(req.body);
    res.send('Hello from authRouter');
});

module.exports = authRouter;