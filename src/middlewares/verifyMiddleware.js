/** @format */

const jwt = require('jsonwebtoken');
const asyncHandle = require('express-async-handler');
const { send } = require('process');

const verifyToken = asyncHandle((req, res, next) =>
{

    console.log('req.headers', req.headers)
    send('hello');
    next();

    // const accessToken = req.headers.authorization;
    // const token = accessToken && accessToken.split(' ')[1];

    // if (!token)
    // {
    //     res.status(401);
    //     throw new Error('Un authorization!!');
    // } else
    // {
    //     try
    //     {
    //         // console.log(token);
    //         const verify = jwt.verify(token, process.env.JWT_SECRET);

    //         if (verify)
    //         {
    //             next();
    //         }
    //     } catch (error)
    //     {
    //         res.status(403);
    //         throw new Error('Access token is not valid!!!');
    //     }
    // }
});

module.exports = verifyToken;