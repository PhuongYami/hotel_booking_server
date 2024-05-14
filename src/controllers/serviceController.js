const asyncHandler = require('express-async-handler');
const axios = require('axios');

// @desc    Search locations
// @route   GET /api/services/locations
// @access  Public
const searchLocation = asyncHandler(async (req, res) =>
{
    console.log('Received query parameters:', req.query);
    const { query } = req.query; // Use req.query for GET requests
    console.log('SearchTerm-server', query);
    try
    {
        const response = await axios.get('http://api.geonames.org/searchJSON', {
            params: {
                q: query,
                maxRows: 20,
                username: process.env.GEONAMES_USERNAME, // Use your GeoNames username
            },
        });
        console.log('Response from GeoNames:', response.data);

        if (response.data.status && response.data.status.value === 10)
        {
            throw new Error(response.data.status.message);
        }

        const cities = response.data;
        res.json(cities);
    } catch (error)
    {
        console.error('Error fetching locations:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }

});

module.exports = {
    searchLocation,
};