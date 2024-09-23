const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users); // Return users with a 200 status code
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error }); // Handle errors
    }
});

// Route to add a new user
router.post('/add', async (req, res) => {
    const { username, email, password } = req.body; // Destructure user data from the request body

    const newUser = new User({
        username,
        email,
        password
    });

    try {
        const savedUser = await newUser.save(); // Save the new user to the database
        res.status(201).json(savedUser); // Return the created user with a 201 status code
    } catch (error) {
        res.status(400).json({ message: 'Error adding user', error }); // Handle errors
    }
});

// Route to edit a user by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters
    const updates = req.body; // Get the updated user data from the request body

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' }); // Handle user not found
        }

        res.status(200).json(updatedUser); // Return the updated user
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error }); // Handle errors
    }
});

// Route to remove a user by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters

    try {
        const deletedUser = await User.findByIdAndDelete(id); // Remove the user from the database

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' }); // Handle user not found
        }

        res.status(200).json({ message: 'User deleted successfully' }); // Return success message
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error }); // Handle errors
    }
});

module.exports = router;