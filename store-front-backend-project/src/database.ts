import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_PORT,
    ENV,
} = process.env;

const currentEnv = ENV || 'dev';

let client: Pool | undefined;
if (currentEnv === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: POSTGRES_PORT ? parseInt(POSTGRES_PORT) : 5432,
    });
}

if (currentEnv === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: POSTGRES_PORT ? parseInt(POSTGRES_PORT) : 5432,
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
