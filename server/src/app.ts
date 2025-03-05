import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'node:path';

import userRoutes from './routes/userRoutes';
import counterRoutes from './routes/counterRoutes';
import { authenticateToken } from './middlewares/authMiddleware';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API-Routen
app.use('/api/user', userRoutes);
app.use('/api/counter', counterRoutes);

// Geschützte Route
app.use('/api/protected', authenticateToken, (_, res) => {
    res.send('This is a protected route!');
});

// API Test-Route
app.get('/api', (_req, res) => {
    res.status(200).json({ message: 'Hello from the server!' });
});

// **Wichtige Änderung hier:** Zuerst die API-Routen und dann statische Dateien
app.use(express.static(path.join(__dirname, 'public')));

// Catch-All für Frontend (SPA) nach den API-Routen
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;
