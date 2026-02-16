const mongoose = require('mongoose');

// Ye batata hai ki User ki details kaisi hongi
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, default: 'User' },
    pan: { type: String, required: true },
    dob: { type: String },
    gender: { type: String },
    income: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Is blueprint ko export kar rahe hain taaki baaki files ise use kar sakein
module.exports = mongoose.model('UserInfo', UserSchema);