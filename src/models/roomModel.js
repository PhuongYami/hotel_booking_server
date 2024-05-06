const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['single', 'double', 'suite'], required: true },
    price: { type: Number, required: true },
    maxOccupancy: { type: Number, required: true },
    images: [{ type: String }],
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    bookedDates: [{ type: Date }],
    children: { type: Number, default: 0 }, // Thêm trường children
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;