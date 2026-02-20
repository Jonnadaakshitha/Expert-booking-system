const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { expertId, name, email, phone, slotDate, slotTime } = req.body;

    // Validation to prevent double booking
    const existingBooking = await Booking.findOne({ expertId, slotDate, slotTime });
    if (existingBooking) {
      return res.status(400).json({ error: "This slot is already booked!" });
    }

    // Inside createBooking function...
const newBooking = new Booking({
  expertId,
  name,
  email,
  phone,
  slotDate,
  slotTime,
  status: "Confirmed" // Change from default 'Pending' to 'Confirmed'
}); 

    const savedBooking = await newBooking.save();

    if (req.io) {
      req.io.emit('slot_booked', { expertId, slotTime });
    }

    res.status(201).json({ message: "Booking confirmed!", booking: savedBooking });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBookingsByExpert = async (req, res) => {
  try {
    const { expertId } = req.params;
    const bookings = await Booking.find({ expertId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
};

// 2. To fix the PENDING vs CONFIRMED issue
exports.createBooking = async (req, res) => {
  try {
    const { expertId, name, email, phone, slotDate, slotTime } = req.body;
    
    const newBooking = new Booking({
      expertId, name, email, phone, slotDate, slotTime,
      status: "Confirmed" // Manually setting to Confirmed
    });

    await newBooking.save();
    if (req.io) req.io.emit('slot_booked', { expertId, slotTime });
    res.status(201).json({ message: "Booking confirmed!" });
  } catch (err) {
    res.status(400).json({ error: "Slot already taken" });
  }
};

// 3. For the My Bookings search
exports.getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const bookings = await Booking.find({ email }).populate('expertId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Error" });
  }
};