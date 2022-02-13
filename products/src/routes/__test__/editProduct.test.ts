import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns status 404 if product with given id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/products/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'asdv',
            price: 40,
            quantity: 30,
            description: 'testing desc',
            category: 'eajfj',
            images: [{url: 'asdasd', isMain: true}]
        })
        .expect(404);
});

it('returns 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/products/${id}`)
        .send({
            title: 'asdv',
            price: 40,
            quantity: 30,
            description: 'testing desc',
            category: 'eajfj',
            images: [{url: 'asdasd', isMain: true}]
        })
        .expect(401);
})