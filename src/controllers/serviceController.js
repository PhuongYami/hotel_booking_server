const asyncHandler = require('express-async-handler');
const axios = require('axios');
const Hotel = require('../models/hotelModel');

// @desc    Search locations
// @route   GET /api/services/locations
// @access  Public
const searchLocation = asyncHandler(async (req, res) =>
{
    const { query } = req.query; // Use req.query for GET requests

    const response = await axios.get('http://api.geonames.org/searchJSON', {
        params: {
            q: query,
            maxRows: 20,
            username: process.env.GEONAMES_USERNAME, // Use your GeoNames username
        },
    });

    if (response.data.status && response.data.status.value === 10)
    {
        throw new Error(response.data.status.message);
    }

    const cities = response.data;
    res.json(cities);
});

// @desc    Search hotels
// @route   GET /api/services/hotels
// @access  Public
const searchHotels = asyncHandler(async (req, res) =>
{
    const { location, checkinDate, checkoutDate, guests, rooms, child } = req.query;
    const availableHotels = req.query;
    console.log('query', availableHotels);
    res.json({
        message: 'Hotels found successfully',
        data: availableHotels,
    });
    // // Initialize the base query object for hotels
    // const hotelQuery = {
    //     city: location, // Search by location
    // };

    // // Execute the query to find hotels matching the location
    // const hotels = await Hotel.find(hotelQuery);

    // // Initialize an array to store available hotels
    // const availableHotels = [];

    // // Iterate over each hotel to check for available rooms
    // for (const hotel of hotels)
    // {
    //     // Find available rooms for the hotel based on the search criteria
    //     const availableRooms = await Room.find({
    //         hotel: hotel._id, // Filter by hotel ID
    //         bookedDates: {
    //             $not: {
    //                 $elemMatch: {
    //                     $or: [
    //                         { $gte: new Date(checkoutDate) }, // Check if room is available after checkout date
    //                         { $lte: new Date(checkinDate) } // Check if room is available before checkin date
    //                     ]
    //                 }
    //             }
    //         },
    //         maxOccupancy: { $gte: guests }, // Ensure room can accommodate guests
    //         children: { $gte: child }, // Ensure room can accommodate children
    //     });

    //     // If available rooms found for the hotel, add it to availableHotels list
    //     if (availableRooms.length > 0)
    //     {
    //         availableHotels.push(hotel);
    //     }
    // }

    // res.json({
    //     message: 'Hotels found successfully',
    //     data: availableHotels,
    // });
});

module.exports = {
    searchLocation,
    searchHotels,
};
