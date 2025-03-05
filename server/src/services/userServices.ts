import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';
import { User } from '../models/userModel';

const saltRounds = 10;

export const registerUser = async (userData: { email: string; password: string }) => {
    const { email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
        'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
        [email, hashedPassword]
    );
    console.log(result.rows[0]);
    return result.rows[0];
};

export const loginUser = async (userData: { email: string; password: string }) => {
    const { email, password } = userData;

    const result = await pool.query('SELECT password_hash FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) throw new Error('User not found');

    const user: User = result.rows[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordCorrect) throw new Error('Invalid credentials');

    // JWT-Token erstellen
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return token;
};

export const getFirstUser = async (): Promise<User | null> => {
    // Logge die Umgebungsvariablen
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_NAME:', process.env.DB_NAME);
    console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
    console.log('DB_PORT:', process.env.DB_PORT);
    const result = await pool.query('SELECT * FROM users LIMIT 1');

    if (result.rows.length === 0) {
        return null; // Kein Benutzer gefunden
    }

    const user: User = result.rows[0];
    return user;
};