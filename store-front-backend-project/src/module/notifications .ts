
import client from '../database';


export type Notification = {
    id?: number;
    user_id?: number;
    order_id: number;
    title: string;
    message: string;
    is_read?: boolean;
    created_at?: Date;
}

export class notificationStore {


    async create(o: Notification): Promise<Notification> {

        try {
            if (!client) {
                throw new Error('database connection failed');
            }
            //'@ts-expect-error
            const conn = await client.connect();
            const sql = `
            INSERT INTO notifications (user_id, order_id, title, message)
            VALUES (1,$1, $2, $3)
            RETURNING *
            `;
            const result = await conn.query(sql, [o.order_id, o.title, o.message]);
            conn.release();
            return result.rows[0];


        } catch (error) {
            throw new Error(`Could not create order: ${error}`);
        }

    }




    async index(): Promise<Notification[]> {
        try {

            if (!client) {
                throw new Error('database connection failed');
            }
            //'@ts-expect-error
            const conn = await client.connect();
            const sql = `SELECT * FROM notifications ORDER BY created_at DESC`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;

        } catch (error) {
            throw new Error(`Could not create order: ${error}`);
        }
    }

    async unreadCount() {

        try {

            if (!client) {
                throw new Error('database connection failed');
            }
            //'@ts-expect-error
            const conn = await client.connect();
            const sql = `SELECT COUNT(*) FROM notifications WHERE is_read = false`;
            const result = await conn.query(sql);
            console.log("www", result);
            conn.release();
            return result.rows[0].count;

        } catch (error) {
            throw new Error(`Could not create order: ${error}`);
        }
    }

    async markAsRead(id: number) {
        try {

            if (!client) {
                throw new Error('database connection failed');
            }
            //'@ts-expect-error
            const conn = await client.connect();
            const sql = `UPDATE notifications SET is_read = true WHERE id = $1`;
            await conn.query(sql, [id]);
            conn.release();
        } catch (error) {
            throw new Error(`Could not create order: ${error}`);
        }
    }
}