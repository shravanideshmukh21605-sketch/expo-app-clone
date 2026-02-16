const User = require('../models/User'); 
const bcrypt = require('bcryptjs');

// --- REGISTER USER ---
exports.registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password, userType, pan, dob, gender, income } = req.body;

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send({ status: "error", data: "User already exists!" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            mobile,
            password: encryptedPassword, 
            userType,
            pan,
            dob,
            gender,
            income
        });

        res.send({ status: "ok", data: "User Registered Successfully" });

    } catch (error) {
        res.send({ status: "error", data: error.message });
    }
};

// --- LOGIN USER (Added this) ---
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check karein ki user database mein hai ya nahi
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ status: "error", data: "User Not Found" });
        }

        // 2. Encrypted password ko compare karein
        // bcrypt.compare check karta hai ki user ka dala hua password aur DB wala hash match ho rahe hain ya nahi
        if (await bcrypt.compare(password, user.password)) {
            // Success!
            return res.json({ status: "ok", data: "Login Success" });
        }

        // Agar password galat hai
        res.json({ status: "error", data: "Invalid Password" });

    } catch (error) {
        res.json({ status: "error", data: error.message });
    }
};