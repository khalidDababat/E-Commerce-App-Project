import client from '../database.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';



import dotenv from 'dotenv';
dotenv.config();

const saltRounds = process.env['SALT_ROUNDS'];
const pepper = process.env['BCRYPT_PASSWORD'];

export type User = {
    id?: number;
    first_name?: string;
    last_name?: string;
    password: string;
    email: string;
    phone?: string;
    created_at?: Date;
    reset_token?: string;
    reset_token_expiration?: Date;
};

export class userStore {
    async index(): Promise<User[]> {
        try {
            //'@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);

            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: number): Promise<User | null> {
        try {
            //'@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql = 'SELECT * FROM users where id=($1)';
            const result = await conn.query(sql, [id]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            // '@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql = `
            INSERT INTO users (first_name, last_name,email, password, phone) 
            VALUES($1, $2, $3,$4,$5) RETURNING *`;

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds as string)
            );

            // console.log("hhhhhh " , hash);

            const result = await conn.query(sql, [
                u.first_name,
                u.last_name ?? '',
                u.email,
                hash,
                u.phone,
            ]);
            const User = result.rows[0];
            conn.release();
            return User;
        } catch (err) {
            throw new Error(
                `Could not create user ${u.first_name}. Error: ${err}`
            );
        }
    }

    async authenticate(email: string, password: string): Promise<User | null> {
        try {
            // '@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();
            const sql = `
            SELECT id, first_name, last_name, email, password,phone
            FROM users
            WHERE email = $1
            `;
            const result = await conn.query(sql, [email]);
            if (result.rows.length) {
                const user = result.rows[0];

                // console.log("password + pepper ",password + pepper);

                if (bcrypt.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        } catch (err) {
            throw new Error(`Could not authenticate user. Error: ${err}`);
        }

    }

    async generateResetToken(email: string): Promise<string | null> {

        try {

            //'@ts-expect-error'
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();


            const token = crypto.randomBytes(32).toString('hex');
            const expiration = new Date(Date.now() + 15 * 60 * 1000);


            const result = await conn.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );




            if (!result.rows.length) {
                conn.release();
                return null;
            }

            await conn.query(
                `UPDATE users 
                 SET reset_token = $1, reset_token_expiration = $2
                 WHERE email = $3`,
                [token, expiration, email]
            );

            conn.release();
            return token;


        } catch (err) {
            throw new Error(`Could not generate reset token. Error: ${err}`);
        }

    }

    async resetPassword(token: string, newPassword: string): Promise<boolean> {

        try {

            //'@ts-expect-error' 
            if (!client) throw new Error('Database client not initialized');

            const conn = await client.connect();

            const result = await conn.query(
                `SELECT * FROM users WHERE reset_token = $1`,
                [token]
            );

            if (!result.rows.length) {
                conn.release();
                return false;
            }

            const user = result.rows[0];

            if (new Date(user.reset_token_expiration) < new Date()) {
                conn.release();
                return false;
            }

            const hash = bcrypt.hashSync(
                newPassword + pepper,
                parseInt(saltRounds as string)
            );

            await conn.query(
                `UPDATE users
                 SET password = $1,
                 reset_token = NULL,
                 reset_token_expiration = NULL
                 WHERE id = $2`,
                [hash, user.id]
            );

            conn.release();
            return true;


        } catch (err) {

            throw new Error(`Could not reset password. Error: ${err}`);
        }
    }

}
