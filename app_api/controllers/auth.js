const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

const signToken = (user) => {
    return jwt.sign(
        {
            sub: user._id.toString(),
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
};

// POST /api/register
const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        const exists = await User.findOne({ email }).exec();
        if (exists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, name, passwordHash });

        res.status(201).json({ message: 'User created', id: user._id });
    } catch (err) {
        res.status(500).json({ message: 'Register failed', error: err });
    }
};

// POST /api/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing credentials' });
        }

        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = signToken(user);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err });
    }
};

module.exports = { register, login };
