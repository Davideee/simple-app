import {Pool} from 'pg';

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Database connection successful');
        client.release(); // Wichtig: Client nach der Nutzung freigeben
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

testConnection(); 