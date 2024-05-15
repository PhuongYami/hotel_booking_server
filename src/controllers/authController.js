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
const handleSendMail = async (val) =>
{
    try
    {
        await transporter.sendMail(val);
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
        const data = {
            from: `Support Yami Booking Application <${ process.env.EMAIL }>`, // sender address
            to: email, // list of receivers
            subject: "Verification email code", // Subject line
            text: "Your code to verification email!", // plain text body
            html: `<h1>${ verificationCode }</h1>`// html body
        }
        await handleSendMail(data);
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
const forgotPassword = asyncHandle(async (req, res) =>
{
    const { email } = req.body;
    const randomPassword = Math.random().toString(36).slice(-8);

    const data = {
        from: `Support Yami Booking Application <${ process.env.EMAIL }>`, // sender address
        to: email, // list of receivers
        subject: "Resend password code!", // Subject line
        text: "Your new password below here!", // plain text body
        html: `<h1>${ randomPassword }</h1>`// html body
    };
    const user = await UserModel.findOne({ email });
    if (user)
    {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(`${ randomPassword }`, salt);

        await UserModel.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            isChangePassword: true,
        })
            .then(() =>
            {
                console.log('Done');
            })
            .catch((error) => console.log(error));

        await handleSendMail(data)
            .then(() =>
            {
                res.status(200).json({
                    message: 'Send email new password successfully!!!',
                    data: [],
                });
            })
            .catch((error) =>
            {
                res.status(401);
                throw new Error('Can not send email');
            });
    } else
    {
        res.status(401);
        throw new Error('User not found!!!');
    }
});
const handleLoginWithGoogle = asyncHandle(async (req, res) =>
{
    const userInfo = req.body;

    const existingUser = await UserModel.findOne({ email: userInfo.email });
    let user;
    if (existingUser)
    {
        await UserModel.findByIdAndUpdate(existingUser.id, {
            updatedAt: Date.now(),
        });
        user = { ...existingUser };
        user.accesstoken = await getJsonWebToken(userInfo.email, userInfo.id);

        if (user)
        {
            const data = {
                accesstoken: user.accesstoken,
                id: existingUser._id,
                email: existingUser.email,
                fcmTokens: existingUser.fcmTokens,
                photo: existingUser.photoUrl,
                name: existingUser.name,
            };

            res.status(200).json({
                message: 'Login with google successfully!!!',
                data,
            });
        } else
        {
            res.sendStatus(401);
            throw new Error('fafsf');
        }
    } else
    {
        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const newUser = new UserModel({
            email: userInfo.email,
            fullname: userInfo.name,
            password: hashedPassword,
            ...userInfo,
        });
        await newUser.save();
        user = { ...newUser };
        user.accesstoken = await getJsonWebToken(userInfo.email, newUser.id);

        if (user)
        {
            res.status(200).json({
                message: 'Login with google successfully!!!',
                data: {
                    accesstoken: user.accesstoken,
                    id: user._id,
                    email: user.email,
                    fcmTokens: user.fcmTokens,
                    photo: user.photoUrl,
                    name: user.name,
                },
            });
        } else
        {
            res.sendStatus(401);
            throw new Error('fafsf');
        }
    }
});


module.exports = {
    register,
    login,
    verification,
    forgotPassword,
    handleLoginWithGoogle,
};
