import client from '../database';

export type ProductFeature = {
    id?: number;
    product_id: number;
    feature_id: number;
};

export class productFeatureStore {
    async create(pf: ProductFeature): Promise<ProductFeature> {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = `
            INSERT INTO product_features 
            (product_id, feature_id)
            VALUES ($1, $2)
            RETURNING *
        `;
        const res = await conn.query(sql, [pf.product_id, pf.feature_id]);
        conn.release();
        return res.rows[0];
    }

    async getFeaturesByProduct(productId: number) {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = `
            SELECT f.id, f.name
            FROM product_features pf
            JOIN features f ON f.id = pf.feature_id
            WHERE pf.product_id = $1
        `;
        const res = await conn.query(sql, [productId]);
        conn.release();
        return res.rows;
    }

    async delete(productId: number, featureId: number): Promise<ProductFeature> {
        if (!client) throw new Error('Database client not initialized');
        // '@ts-expect-error
        const conn = await client.connect();
        const sql = `
            DELETE FROM product_features 
            WHERE product_id = $1 AND feature_id = $2
            RETURNING *
        `;
        const res = await conn.query(sql, [productId, featureId]);
        conn.release();
        return res.rows[0];
    }
}
