// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const authRoutes = require('./auth'); // Import auth routes
const productRoutes = require('./products'); // Import product routes

const app = express();
const PORT = 5000; // You can use any available port

// Middleware
app.use(cors());
app.use(bodyParser.json());
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Ensure uploads directory exists
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/efarmer', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Use routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/products', productRoutes); // Product routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
