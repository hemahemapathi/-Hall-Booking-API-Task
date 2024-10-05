const Booking = require('../models/Booking');

let bookings = [];
let customers = [];

const createBooking = (req, res) => {
  const { customerId, customerName, roomId, date, startTime, endTime } = req.body;

  // Check if the room is already booked
  const isRoomBooked = bookings.some(
    booking =>
      booking.roomId === roomId &&
      booking.date === date &&
      ((startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime))
  );

  if (isRoomBooked) {
    return res.status(400).json({ error: 'Room is already booked for the given time slot' });
  }

  const id = bookings.length + 1;
  const newBooking = new Booking(id, customerId, roomId, date, startTime, endTime);
  bookings.push(newBooking);

  if (!customers.find(customer => customer.id === customerId)) {
    customers.push({ id: customerId, name: customerName });
  }

  res.status(201).json(newBooking);
};

const getAllBookings = (req, res) => {
  const bookingsWithRoomDetails = bookings.map(booking => ({
    ...booking,
    roomName: `Room ${booking.roomId}`,
    customerName: customers.find(customer => customer.id === booking.customerId)?.name
  }));
  res.json(bookingsWithRoomDetails);
};

const getAllCustomers = (req, res) => {
  const customersWithBookings = customers.map(customer => {
    const customerBookings = bookings.filter(booking => booking.customerId === customer.id);
    return {
      ...customer,
      bookings: customerBookings.map(booking => ({
        roomId: booking.roomId,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.id
      }))
    };
  });
  res.json(customersWithBookings);
};

const getCustomerBookings = (req, res) => {
  const customerId = parseInt(req.params.customerId);
  const customerBookings = bookings.filter(booking => booking.customerId === customerId);
  const customer = customers.find(c => c.id === customerId);
  
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const bookingDetails = {
    customerId: customer.id,
    customerName: customer.name,
    bookings: customerBookings.map(booking => ({
      roomId: booking.roomId,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookingId: booking.id,
      bookingDate: booking.bookingDate,
      bookingStatus: booking.status
    }))
  };
  
  res.json(bookingDetails);
};

module.exports = {
  createBooking,
  getAllBookings,
  getAllCustomers,
  getCustomerBookings,
};
