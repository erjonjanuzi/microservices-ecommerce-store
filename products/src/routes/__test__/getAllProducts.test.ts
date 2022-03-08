import { Roles } from '@labcourseapp/common';
import request from 'supertest';
import { app } from '../../app';

const createProduct = () => {
    return request(app)
        .post('/api/products')
        .set('Cookie', global.signin(Roles.ADMIN))
        .attach('images', global.getMockImage())
        .field({
            title: 'title',
            price: 100,
            quantity: 30,
            description: 'This is a descr',
            category: 'other',
        })
        .expect(201);
};

it('returns list of products', async () => {
    await createProduct();
    await createProduct();
    await createProduct();

    const { body } = await request(app).get('/api/products').send().expect(200);

    expect(body.length).toEqual(3);
});
