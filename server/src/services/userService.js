import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { generateUserToken } from "../utils/tokenUtils.js";

export default {
    async register(username, email, password, confirmPassword) {
        if (password !== confirmPassword) {
            throw new Error('Passwords are not the same!');
        }

        const userExists = await User.exists({ 
            $or: [{ email }, { username }] 
        }).lean();

        if (userExists) {
            throw new Error('User with the same email or username already exists!');
        }

        const user = await User.create({ username, email, password });

        return {
             _id: user._id,
            email: user.email, 
            role: user.role,
            accessToken: generateUserToken(user),
        };
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid user or password!');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invaid user or password!');
        }

        return {
            _id: user._id,
            email: user.email,
            role: user.role,
            accessToken: generateUserToken(user),
        };
    }
}