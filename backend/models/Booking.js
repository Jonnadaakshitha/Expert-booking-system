const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  expertId: { 
  type: mongoose.Schema.Types.ObjectId, 
  ref: 'Expert', // This MUST match the name in your Expert model file
  required: true 
},
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  status: { 
  type: String, 
  default: 'Confirmed' // This makes "Confirmed" the automatic choice
}
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);