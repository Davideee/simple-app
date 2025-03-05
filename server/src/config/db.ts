import { Pool } from 'pg';

export const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.DATABASE_URL,
    database: process.env.POSTGRES_DB,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
});