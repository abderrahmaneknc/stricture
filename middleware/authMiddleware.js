const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models/user');

dotenv.config();

exports.protect = async (req, res, next) => {
    let token;

    // 1️⃣ Get token from Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]; // "Bearer <token>"
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    try {
        // 2️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3️⃣ Attach user to request object
        req.user = { userId: decoded.userId, email: decoded.email };

        next(); // move to the next middleware or controller
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token invalid' });
    }
};
