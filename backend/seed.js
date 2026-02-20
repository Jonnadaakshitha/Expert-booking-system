const mongoose = require('mongoose');
const Expert = require('./models/Expert'); // Make sure this path is correct!
require('dotenv').config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Now Expert.deleteMany() will work because it's imported correctly
    await Expert.deleteMany({}); 
    console.log("Old experts cleared!");

    // Add your list of 7 experts here to fix pagination
    await Expert.insertMany([
      { name: "John", category: "Technology", experience: 10, rating: 4.8, availableSlots: ["10:00 AM", "11:00 AM"] },
      { name: "Sarah", category: "Design", experience: 5, rating: 4.9, availableSlots: ["09:00 AM", "01:00 PM"] },
      { name: "Alex", category: "Finance", experience: 8, rating: 4.7, availableSlots: ["10:00 AM", "12:00 PM"] },
      { name: "Dr. Adams", category: "Health", experience: 12, rating: 4.7, availableSlots: ["10:00 AM", "11:00 AM"] },
      { name: "Emily", category: "Fitness", experience: 4, rating: 4.5, availableSlots: ["11:00 AM", "03:00 PM"] },
      { name: "Dr. Smith", category: "Health", experience: 15, rating: 4.9, availableSlots: ["08:00 AM", "09:00 AM"] },
      { name: "Michael UI", category: "Design", experience: 7, rating: 4.8, availableSlots: ["02:00 PM", "05:00 PM"] },
      { name: "Chris Dev", category: "Technology", experience: 6, rating: 4.6, availableSlots: ["01:00 PM", "02:00 PM"] },
      { name: "Nurse Joy", category: "Health", experience: 9, rating: 5.0, availableSlots: ["01:00 PM", "03:00 PM"] },
      { name: "Lisa Growth", category: "Marketing", experience: 9, rating: 4.7, availableSlots: ["11:00 AM", "12:00 PM"] },
      { name: "James Wealth", category: "Finance", experience: 20, rating: 5.0, availableSlots: ["09:00 AM", "10:00 AM"] }
    ]);

    console.log("Database Seeded! 🌱");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();