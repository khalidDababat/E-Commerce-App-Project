import supertest from 'supertest';
import { app } from '../../src/server';

let token: string = '';

describe('Categories Endpoint Testing', () => {
    const request = supertest(app);

    beforeAll(async () => {
        // Authenticate to get token
        const newUser = {
            firstname: 'test',
            lastname: 'user',
            password: '1234',
        };

        await request.post('/users').send(newUser);

        const res = await request.post('/users/authenticate').send({
            firstname: 'test',
            password: '1234',
        });

        token = res.body.token;
    });

    it('GET /categories => should return list of categories', async () => {
        const res = await request.get('/categories');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /categories/:id => should return one category', async () => {
        // First, create a category
        const createRes = await request
            .post('/categories')
            .send({ category: 'Test Category' })
            .set('Authorization', `Bearer ${token}`);

        const categoryId = createRes.body.id;

        const res = await request.get(`/categories/${categoryId}`);

        expect(res.status).toBe(200);
        expect(res.body.category).toBe('Test Category');
    });

    it('POST /categories => should create a new category', async () => {
        const res = await request
            .post('/categories')
            .send({ category: 'New Category' })
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.category).toBe('New Category');
    });

    it('DELETE /categories/:id => should delete a category', async () => {
        // First, create a category
        const createRes = await request
            .post('/categories')
            .send({ category: 'Category to Delete' })
            .set('Authorization', `Bearer ${token}`);

        const categoryId = createRes.body.id;

        const res = await request
            .delete(`/categories/${categoryId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.category).toBe('Category to Delete');
    });
});
