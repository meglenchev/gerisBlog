import jwt from 'jsonwebtoken';

export function verifyToken(allowedRoles = []) {
    return async (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decodedToken;

            if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
            }

            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please login again.' });
            }

            res.status(401).json({ message: 'Invalid token.' });
        }
    }
}