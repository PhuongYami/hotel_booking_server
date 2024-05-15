const HotelModal = require('../models/hotelModel');
const asyncHandle = require('express-async-handler');


const createHotel = asyncHandle(async (req, res) =>
{
    const success = true;
    const { name, description, address, city, country, amenities, owner } = req.body;
    console.log(req.body);

    const newHotel = new HotelModal({
        name: name,
        description: description,
        address: address,
        city: city,
        country: country,
        amenities: amenities,
        owner: owner
    });
    await newHotel.save();

    res.status(200).json({
        message: 'Hotel created successfully',
        data: {
            id: newHotel._id,
            name: newHotel.name,
            description: newHotel.description,
            address: newHotel.address,
            city: newHotel.city,
            country: newHotel.country,
            amenities: newHotel.amenities,
            owner: newHotel.owner
        },
    });
});
module.exports = {
    createHotel,
};