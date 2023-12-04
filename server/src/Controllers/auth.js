import { Users } from '../models/Users.js';
import generateToken from '../utils/generateToken.js';
import validator from 'validator';
import expressAsyncHandler from 'express-async-handler';

import bcrypt from 'bcrypt';

const Register = async (req, res) => {
    const { username, email, password, age, gender } = req.body;

    try {
        // Check for required fields
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ error: 'Please provide all required fields.' });
        }

        // Check if the user already exists
        const userExists = await Users.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user with the hashed password and other provided data
        const user = await Users.create({
            username,
            email,
            password: hashedPassword,
            age,
            gender,
        });

        if (user) {
            return res.status(201).json(user);
        } else {
            return res.status(400).json({ error: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create user' });
    }
};

// Login an existing user
const login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: 'Please provide all required fields.' });
    } else {
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        } else {
            try {
                // Check if the user exists
                const user = await Users.findOne({ email });
                if (!user) {
                    return res.status(401).json({ error: 'No user found' });
                } else {
                    // Compare passwords
                    const isPasswordValid = await bcrypt.compare(
                        password,
                        user.password
                    );
                    if (!isPasswordValid) {
                        return res
                            .status(401)
                            .json({ error: 'Invalid credentials' });
                    } else {
                        const token = generateToken(user._id);
                        res.status(200).json({ user, token: token });
                    }
                }
            } catch (error) {
                res.status(500).json({ error: 'Failed to login' });
                console.error(error);
            }
        }
    }
});
export { login, Register };
