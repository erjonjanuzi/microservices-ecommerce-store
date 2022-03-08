import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Product } from '../../models/product';
import { Roles } from '@labcourseapp/common';

it('returns 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).delete(`/api/products/${id}`).send().expect(401);
});

it('returns 401 if user role is not admin', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .delete(`/api/products/${id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(401);
});

it('returns 400 if product id is not a valid mongoId', async () => {
    await request(app)
        .delete('/api/products/asd')
        .set('Cookie', global.signin(Roles.ADMIN))
        .send()
        .expect(400);
});

it('returns 404 if product is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .delete(`/api/products/${id}`)
        .set('Cookie', global.signin(Roles.ADMIN))
        .send()
        .expect(404);
});

it('deletes a product and returns 200', async () => {
    const cookie = global.signin(Roles.ADMIN);

    const { body: product } = await request(app)
        .post('/api/products')
        .set('Cookie', cookie)
        .attach('images', global.getMockImage())
        .field({
            title: 'title',
            price: 150,
            quantity: 30,
            description: 'This is a descr',
            category: 'other',
        })
        .expect(201);

    let products = await Product.find({});
    expect(products.length).toEqual(1);

    await request(app)
        .delete(`/api/products/${product.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);

    products = await Product.find({});
    expect(products.length).toEqual(0);
});
