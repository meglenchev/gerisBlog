import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';
import userService from '../services/userService.js';
import { User } from '../models/User.js';

export async function authMiddleware(req, res, next) {
    const token = req.headers['x-authorization'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token! User not found.' });
        }

        req.user = user;
        req.isAuthenticated = true;

        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token.' });
    }
}