const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const asyncHandle = require('express-async-handler');


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
                ...newUser,
                accesstoken: getJsonWebToken(email, newUser.id)
            }

        });
    } catch (error)
    {
        res.status(500).json({ message: 'Error Server' });
    }

});

module.exports = {
    register
};
