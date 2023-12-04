import { Users } from '../models/Users.js';
import expressAsyncHandler from 'express-async-handler';
import validator from 'validator';
import bcrypt from 'bcrypt';

const getById = expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user ' });
    }
});

// Function to update user information
const updateUser = async (req, res) => {
    const id = req.params.id;
    const { username, email, password, age, gender, profileImage } = req.body;

    try {
        // Create a new user object with the provided data
        const newUser = {
            username,
            email,
            age,
            gender,
            profileImage,
        };

        // Validate email
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Check if the password field exists and hash the new password
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with bcrypt
            newUser.password = hashedPassword; // Assign the hashed password to newUser
        }

        const updatedUser = await Users.findByIdAndUpdate(id, newUser, {
            new: true,
        });

        if (updatedUser) {
            // Send the updated user information in the response
            return res.status(200).json(updatedUser);
        } else {
            return res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        console.error('Update User Error:', error);
        return res.status(500).json({ error: 'Failed to update User.' });
    }
};

const deleteUser = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        // Find the user by ID
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        } else {
            // Delete the user
            await Users.findByIdAndDelete(id);

            res.json({
                message:
                    'User and associated posts and images deleted successfully.',
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Failed to delete user and associated posts and images.',
        });
    }
});

export { getById, updateUser, deleteUser };
