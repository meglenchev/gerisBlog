import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export async function authMiddleware(req, res, next) {
    //const token = req.headers['x-authorization'];
    const token = req.cookies.token;

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

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