import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if no product is found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .get(`/api/products/${id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(404);
});

it('returns the product if it found', async () => {
    const title = 'title';
    const price = 20;

    const response = await request(app)
        .post(`/api/products`)
        .set('Cookie', global.signin())
        .send({
            title,
            price,
            quantity: 30,
            description: 'asda',
            category: 'other',
            images: [{ url: 'img.png', isMain: true }],
        })
        .expect(201);
    
    const productResponse = await request(app)
        .get(`/api/products/${response.body.id}`)
        .send()
        .expect(200)
    
    expect(productResponse.body.title).toEqual(title);
    expect(productResponse.body.price).toEqual(price);
});
