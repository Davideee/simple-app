import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/userServices';

export const registerUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', id: user.id });
    } catch (err) {
        res.status(500).json({ message: 'Error during registration' });
    }
};

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = await loginUser(req.body);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};
