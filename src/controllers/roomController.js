const RoomModel = require('../models/roomModel');
const asyncHandle = require('express-async-handler');

const getRoomDetails = asyncHandle(async (req, res) =>
{
    const { uid: roomId } = req.query; // Lấy roomId từ query parameters
    console.log('roomId', roomId);

    try
    {
        const room = await RoomModel.findById(roomId); // Tìm phòng với roomId trong cơ sở dữ liệu
        if (!room)
        {
            return res.status(404).json({ message: "Room not found" }); // Nếu không tìm thấy phòng, trả về mã lỗi 404
        }
        res.status(200).json(room); // Nếu tìm thấy phòng, trả về thông tin phòng
    } catch (error)
    {
        console.error('Error getting room details:', error);
        res.status(500).json({ message: "Internal server error" }); // Nếu có lỗi, trả về mã lỗi 500
    }
});

module.exports = { getRoomDetails };