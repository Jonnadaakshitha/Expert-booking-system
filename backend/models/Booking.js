const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  slotDate: { type: String, required: true }, 
  slotTime: { type: String, required: true }, 
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed'], default: 'Pending' }
});

// Force MongoDB to index these three fields together
bookingSchema.index({ expertId: 1, slotDate: 1, slotTime: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);