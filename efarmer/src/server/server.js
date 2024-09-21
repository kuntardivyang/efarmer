const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/efarmer', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    isFarmer: { type: Boolean, required: true }
});

// User Model
const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password, phone, isFarmer } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phone,
        isFarmer
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json({ msg: "User created successfully", user: savedUser });
    } catch (err) {
        res.status(500).json({ msg: "Error creating user", error: err.message });
    }
});


// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        // You can also send a token here for authentication if needed
        res.status(200).json({ msg: "Login successful", user });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});



// Profile Route to get user details
app.get('/profile/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select('-password'); // Exclude the password field
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
});







// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
