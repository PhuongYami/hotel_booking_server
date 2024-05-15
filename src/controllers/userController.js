const UserModel = require('../models/userModel');
const asyncHandle = require('express-async-handler');
const bcrypt = require('bcrypt');
require('dotenv').config();


// Get user information
const getUserInfo = asyncHandle(async (req, res) =>
{

    const { uid } = req.query;
    const { role } = '';
    console.log(req.query);
    if (uid)
    {
        const profile = await UserModel.findOne({ _id: uid });

        if (profile)
        {
            res.status(200).json({
                message: 'User information retrieved successfully',
                data: {
                    uid: profile._id,
                    createdAt: profile.createdAt,
                    updatedAt: profile.updatedAt,
                    name: profile.name ?? '',
                    givenName: profile.givenName ?? '',
                    familyName: profile.familyName ?? '',
                    email: profile.email ?? '',
                    photo: profile.photo ?? '',
                    phone: profile.phone ?? '',
                    role: profile.role ?? 'user',
                },
            });
        } else
        {
            res.status(404).json({
                message: 'User not found',
            });
        }
    } else
    {
        res.status(400).json({
            message: 'Missing uid',
        });
    }
});

// Update user information
const updateInfo = asyncHandle(async (req, res) =>
{

    const { uid } = req.query;
    const { name, givenName, familyName, email, password, phone, photo } = req.body;


    // console, log(uid);
    // console.log(req.body.data);


    // Find the user by id
    const user = await UserModel.findById(uid);
    if (!user)
    {
        return res.status(404).json({ message: 'User not found!' });
    }


    // Check if the email is already in use by another user
    if (email !== user.email)
    {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser)
        {
            return res.status(400).json({ message: 'Email is already in use!' });
        }
    }
    // console.log(user);
    // res.json({ message: 'User information updated successfully!' });

    // Update user information
    user.name = name || user.name;
    user.givenName = givenName || user.givenName;
    user.familyName = familyName || user.familyName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.photo = photo || user.photo;

    // If password is provided, hash it
    if (password)
    {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
        message: 'User information updated successfully!',
        data: {
            id: updatedUser.id,
            name: updatedUser.name,
            givenName: updatedUser.givenName,
            familyName: updatedUser.familyName,
            email: updatedUser.email,
            phone: updatedUser.phone,
            photo: updatedUser.photo,
        },
    });
});

// Update user information
const updateRole = asyncHandle(async (req, res) =>
{

    const { uid } = req.query;

    // Find the user by id
    const user = await UserModel.findById(uid);
    if (!user)
    {
        return res.status(404).json({ message: 'User not found!' });
    }


    // Update user information
    user.role = 'owner';

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
        message: 'User information updated successfully!',
        data: {
            id: updatedUser.id,
            role: updatedUser.role,
        },
    });
});

module.exports = {
    updateInfo,
    getUserInfo,
    updateRole,
};