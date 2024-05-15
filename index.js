const express = require('express');
const cors = require('cors');
const authRouter = require('./src/routers/authRouter');
const serviceRouter = require('./src/routers/serviceRouter');
const userRouter = require('./src/routers/userRouter');
const hotelRouter = require('./src/routers/hotelRouter');
const connectDB = require('./src/configs/connectDb');
const errorMiddleHandle = require('./src/middlewares/errorMiddleware');


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
app.get('/', (req, res) =>
{
    res.send('Server is running');
});

app.use('/auth', authRouter);
app.use('/service', serviceRouter);
app.use('/user', userRouter);
app.use('/hotel', hotelRouter);


connectDB();

// Error handling middleware
app.use(errorMiddleHandle);

// Start the server
const port = 3000;
app.listen(port, () =>
{
    console.log(`Server is running on port ${ port }`);
});
