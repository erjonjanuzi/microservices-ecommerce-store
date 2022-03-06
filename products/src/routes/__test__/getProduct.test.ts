import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Roles } from '@labcourseapp/common';

it('returns 404 if no product is found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .get(`/api/products/${id}`)
        .send()
        .expect(404);
});

it('returns the product if it found', async () => {
    // arrange
    const title = 'title';
    const price = 20;

    const response = await request(app)
        .post(`/api/products`)
        .set('Cookie', global.signin(Roles.ADMIN))
        .send({
            title,
            price,
            quantity: 30,
            description: 'asda',
            category: 'other',
            images: [{ url: 'img.png', isMain: true }],
        })
        .expect(201);
    
    // act
    const productResponse = await request(app)
        .get(`/api/products/${response.body.id}`)
        .send()
        .expect(200)
    
    // assert
    expect(productResponse.body.title).toEqual(title);
    expect(productResponse.body.price).toEqual(price);
});
