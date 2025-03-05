import {Request, Response} from 'express';
import {registerUser, loginUser, getFirstUser} from '../services/userServices';

export const registerUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({message: 'User registered successfully', id: user.id});
    } catch (err) {
        res.status(500).json({message: 'Error during registration'});
    }
};

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = await loginUser(req.body);
        res.status(200).json({message: 'Login successful', token});
    } catch (err) {
        res.status(400).json({message: 'Invalid credentials'});
    }
};

export const findUserController = async (_: Request, res: Response): Promise<void | Response> => {
    try {
        console.log('Fetching user from database...');
        const user = await getFirstUser();
        if (!user) {
            console.log('No user found');
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('User found:', user);
        return res.status(200).json({ message: 'found user', user });  
    } catch (err) {
        console.error('Error in findUserController:', err);
        return res.status(400).json({ message: 'Invalid search user' });  
    }
};
