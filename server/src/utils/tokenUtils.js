import jwt from "jsonwebtoken";

export function generateUserToken(user) {
    const payload = {
        id: user.id, 
        email: user.email
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2h'});
}