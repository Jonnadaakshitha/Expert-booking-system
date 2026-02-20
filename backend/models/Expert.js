const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "Tech", "Health"
  experience: { type: Number, required: true }, // Years
  rating: { type: Number, default: 0 },
  availableSlots: [String] // e.g., ["10:00 AM", "11:00 AM"]
});

module.exports = mongoose.model('Expert', expertSchema);