const express = require('express');
const cors = require('cors');
const authRouter = require('./src/routers/authRouter');
const connectDB = require('./src/configs/connectDb');
const errorMiddleHandle = require('./src/middlewares/errorMiddleware');

// Import required modules
const app = express();

app.use(cors());
app.use(express.json());

// Define routes
app.get('/', (req, res) =>
{
    res.send('Server is running');
});

app.use('/auth', authRouter);

connectDB();
app.use(errorMiddleHandle);

// Start the server
const port = 3000;
app.listen(port, () =>
{
    console.log(`Server is running on port ${ port }`);
});