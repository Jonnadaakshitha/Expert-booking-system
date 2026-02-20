const Booking = require('../models/Booking'); // ONLY ONE DECLARATION ALLOWED HERE

exports.createBooking = async (req, res) => {
  try {
    const { expertId, name, email, phone, slotDate, slotTime } = req.body;

    // 1. Double-booking check
    const existing = await Booking.findOne({ expertId, slotDate, slotTime });
    if (existing) return res.status(400).json({ error: "Slot already taken!" });

    // 2. Create with explicit status
    const newBooking = new Booking({
  expertId,
  name,
  email,
  phone,
  slotDate,
  slotTime,
  status: "Confirmed" // 🔥 Force it to be Confirmed here
});

    const savedBooking = await newBooking.save();
    
    // 3. Populate so the response includes the expert's name
    const populatedBooking = await Booking.findById(savedBooking._id).populate('expertId');

    if (req.io) {
      req.io.emit('slot_booked', { expertId, slotTime });
    }

    res.status(201).json({ message: "Booking confirmed!", booking: populatedBooking });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// 2. GET /bookings?email=... - Get bookings by user email
exports.getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    // .populate('expertId') tells Mongoose to go find the Expert's name
    const bookings = await Booking.find({ email }).populate('expertId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching bookings" });
  }
};

// 3. GET /bookings/expert/:expertId - Get taken slots for specific expert
exports.getBookingsByExpert = async (req, res) => {
  try {
    const { expertId } = req.params;
    const bookings = await Booking.find({ expertId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching expert slots" });
  }
};

// 4. PATCH /bookings/:id/status - Update booking status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
};