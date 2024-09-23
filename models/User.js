const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true // Remove whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        trim: true,
        lowercase: true // Convert email to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum password length
    },
    createdAt: {
        type: Date,
        default: Date.now // Set default to current date
    }
});

// Export the User model
module.exports = mongoose.model('User', userSchema);