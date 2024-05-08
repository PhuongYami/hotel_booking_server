const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const asyncHandle = require('express-async-handler');
const nodemailer = require("nodemailer");
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
// Create JSON Web Token
const getJsonWebToken = (email, id) =>
{
    const payload = {
        email, id
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    return token;
};


// Register a new user
const register = asyncHandle(async (req, res) =>
{

    try
    {
        const { name, email, phone, password } = req.body;

        // Check if the email is already in use
        const existingUser = await UserModel.findOne({ email });
        if (existingUser)
        {
            return res.status(400).json({ message: 'User has already exist!' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
        });
        await newUser.save();

        res.status(200).json({
            message: 'Register successfully!',
            data: {
                email: newUser.email,
                id: newUser.id,
                accesstoken: getJsonWebToken(email, newUser.id)
            }

        });
    } catch (error)
    {
        res.status(500).json({ message: 'Error Server' });
    }

});
const handleSendMail = async (val, email) =>
{

    try
    {
        await transporter.sendMail({
            from: `Support Yami Booking Application <${ process.env.EMAIL }>`, // sender address
            to: email, // list of receivers
            subject: "Verification email code", // Subject line
            text: "Your code to verification email!", // plain text body
            html: `<h1>${ verificationCode }</h1>`// html body
        });
        return 'Send email successfully!'

    } catch (error)
    {
        return error
    }
};
const verification = asyncHandle(async (req, res) =>
{
    const { email } = req.body;
    const verificationCode = Math.round(1000 + Math.random() * 9000);
    try
    {
        await handleSendMail(verificationCode, email);
        res.status(200).json({
            message: 'Send verification code successfully!  ',
            data: {
                verificationCode
            }
        });
    } catch (error)
    {
        res.status(401).json({ message: 'Can not send verification email.' });
    }
}
);

const login = asyncHandle(async (req, res) =>
{
    const { email, password } = req.body;
    const exitingUser = await UserModel.findOne({ email });
    if (!exitingUser)
    {
        return res.status(403).json({ message: 'User does not exist!' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, exitingUser.password);
    if (!isPasswordCorrect)
    {
        return res.status(401).json({ message: 'Password is incorrect!' });
    }
    res.status(200).json({
        message: 'Login successfully!',
        data: {
            email: exitingUser.email,
            id: exitingUser.id,
            accesstoken: getJsonWebToken(email, exitingUser.id)
        }
    });
}
);

module.exports = {
    register,
    login,
    verification
};
