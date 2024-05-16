const BookingModel = require('../models/bookingModel');
const asyncHandle = require('express-async-handler');

const createBooking = asyncHandle(async (req, res) =>
{
    const { hotelId, roomId, userId, totalPrice, checkIn, checkOut, paymentMethod } = req.body;
    console.log(req.body);

    // Validate if required data is provided
    if (!hotelId || !roomId || !userId || !totalPrice || !checkIn || !checkOut || !paymentMethod)
    {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the hotel or room exists
    // Here you might want to implement additional checks depending on your schema and requirements
    const existingBooking = await BookingModel.findOne({ hotelId, roomId });

    if (existingBooking)
    {
        return res.status(400).json({ message: 'Booking already exists for this hotel and room' });
    }

    // Create a new booking
    const newBooking = new BookingModel({
        user: userId,
        hotel: hotelId,
        room: roomId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
    });

    await newBooking.save();
    console.log(newBooking._id);

    res.status(200).json({
        message: 'Booking created successfully',
        data: {
            id: newBooking._id,
            hotelId: newBooking.hotel,
            roomId: newBooking.room,
            userId: newBooking.user,
            totalPrice: newBooking.totalPrice,
            checkIn: newBooking.checkInDate,
            checkOut: newBooking.checkOutDate,

        },
    });
});
const getBookings = asyncHandle(async (req, res) =>
{
    const userId = req.params.userId; // Assuming the user ID is passed as a path parameter
    console.log(userId);
    // try
    // {
    //     // Find all bookings for the given userId
    //     const bookings = await BookingModel.find({ user: userId });

    //     if (bookings.length === 0)
    //     {
    //         return res.status(404).json({ message: 'No bookings found for the given user' });
    //     }

    //     // Map the bookings to a more readable format
    //     const formattedBookings = bookings.map((booking) => ({
    //         id: booking._id,
    //         hotelId: booking.hotel,
    //         roomId: booking.room,
    //         userId: booking.user,
    //         totalPrice: booking.totalPrice,
    //         checkIn: booking.checkInDate,
    //         checkOut: booking.checkOutDate,
    //         paymentMethod: booking.paymentMethod,
    //     }));

    //     res.status(200).json({ bookings: formattedBookings });
    // } catch (error)
    // {
    //     console.error('Error fetching bookings:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }
});

module.exports = {
    createBooking,
    getBookings,
};
