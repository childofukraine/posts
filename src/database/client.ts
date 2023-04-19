import { Client,Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

export const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
    ssl: true
});

export const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
    ssl: true
});