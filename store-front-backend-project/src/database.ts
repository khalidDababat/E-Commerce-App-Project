import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

const POSTGRES_HOST = process.env['POSTGRES_HOST'];
const POSTGRES_USER = process.env['POSTGRES_USER'];
const POSTGRES_PASSWORD = process.env['POSTGRES_PASSWORD'];
const POSTGRES_DB = process.env['POSTGRES_DB'];
const POSTGRES_TEST_DB = process.env['POSTGRES_TEST_DB'];
const ENV = process.env['ENV'];

let client: Pool | undefined;
if (ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: 5432,
    });
} else {
    client = new Pool({
        connectionString: process.env['DATABASE_URL'],
        ssl: {
            rejectUnauthorized: false,
        },
    });
}

if (ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: 5432,
    });
}

if (!client) {
    throw new Error(
        'Database client is not configured. Check ENV and POSTGRES_* variables.'
    );
}

client
    .connect()
    .then(() => {
        console.log('database connected');
    })
    .catch((err: any) => {
        console.log(err, 'database error');
    });

export default client;
