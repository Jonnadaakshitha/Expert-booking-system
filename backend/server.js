const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
// Add this near your other imports at the top
const bookingRoutes = require('./routes/bookingRoutes');
const expertRoutes = require('./routes/expertRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// The Walkie-Talkie setup
const io = new Server(server, {
  cors: { origin: "*" } // Allows the Frontend to talk to the Backend
});

app.use(cors());
app.use(express.json());
// Add this below app.use(express.json());
app.use('/api/bookings', bookingRoutes);
app.use('/api/experts', expertRoutes);

// Connect to the Database (The Brain's Memory)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database is Connected! ✅"))
  .catch(err => console.log("Database Error: ❌", err));

// Share the "Walkie-Talkie" with our routes
app.set('socketio', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
