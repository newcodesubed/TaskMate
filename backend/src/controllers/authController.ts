import { Request, Response } from 'express';
import { createUser, findUserByUsername } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const TOKEN_EXPIRY = '1d'; // 1 day

export const signup = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const existingUser = await findUserByUsername(username);
        if (existingUser) return res.status(400).json({ message: 'Username already exists' });

        const user = await createUser(username, password);
        res.status(201).json({ id: user.id, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.json({ id: user.id, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};
