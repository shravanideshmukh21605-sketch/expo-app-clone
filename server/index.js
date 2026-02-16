require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json()); 
app.use(cors());

// --- ADDED THIS: Root Route for Testing ---
// Jab aap browser mein IP:5001 kholenge, toh ab "Cannot GET" nahi dikhega
app.get("/", (req, res) => {
    res.send("🚀 Backend Server is Running Perfectly!");
});

// Routes
app.use('/', authRoutes);

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Success! Connected to MongoDB Atlas");
        // Server Start
        app.listen(5001, () => {
            console.log("🚀 Server is running on port 5001");
            console.log("🔗 Local: http://localhost:5001");
            // Mobile testing ke liye niche wala console log kaam aayega
            console.log("📱 Network testing: Use your IP address on mobile browser");
        });
    })
    .catch((err) => {
        console.log("❌ DB Connection Error: ", err);
    });