const Room = require('../models/Room');

let rooms = [];
let nextRoomId = 1;

exports.createRoom = (req, res) => {
  const { name, seats, amenities, pricePerHour } = req.body;
  const newRoom = new Room(nextRoomId++, name, seats, amenities, pricePerHour);
  rooms.push(newRoom);
  res.status(201).json(newRoom);
};

exports.getAllRooms = (req, res) => {
  res.json(rooms);
};

exports.getRoomById = (req, res) => {
  const room = rooms.find(r => r.id === parseInt(req.params.id));
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
};

module.exports = exports;
