import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Users } from '../models/Users.js';

const jwtsecret = 'YOUR_JWT_TOKEN';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    // Check for the token in the Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]; // Extract the token from the "Bearer" token
    }

    if (token) {
        try {
            // Verify token
            const decoded = jwt.verify(token, jwtsecret);

            // Get user from the token
            /* req.user = await Users.findById(decoded.id).select('-password'); */

            const userId = decoded.userId;
            const user = await Users.findById(userId);
            req.user = user;

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized' });
            console.error(error);
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});

export default protect;
