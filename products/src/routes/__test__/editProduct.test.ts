import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../natsWrapper';

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
            images: [{ url: 'asdasd', isMain: true }],
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
            images: [{ url: 'asdasd', isMain: true }],
        })
        .expect(401);
});

it('returns 400 if title, price, quantity, description, category or images is not provided', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/products/${id}`)
        .set('Cookie', global.signin())
        .send({
            price: 40,
            quantity: 30,
            description: 'testing desc',
            category: 'eajfj',
            images: [{ url: 'asdasd', isMain: true }],
        })
        .expect(400);

    await request(app)
        .put(`/api/products/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            quantity: 30,
            description: 'testing desc',
            category: 'eajfj',
            images: [{ url: 'asdasd', isMain: true }],
        })
        .expect(400);

    await request(app)
        .put(`/api/products/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            price: 30,
            description: 'testing desc',
            category: 'eajfj',
            images: [{ url: 'asdasd', isMain: true }],
        })
        .expect(400);

    await request(app)
        .put(`/api/products/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            price: 30,
            quantity: 30,
            category: 'eajfj',
            images: [{ url: 'asdasd', isMain: true }],
        })
        .expect(400);

    await request(app)
        .put(`/api/products/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            price: 30,
            quantity: 30,
            description: 'eajfj',
            images: [{ url: 'asdasd', isMain: true }],
        })
        .expect(400);

    await request(app)
        .put(`/api/products/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'title',
            price: 30,
            quantity: 30,
            description: 'eajfj',
            category: 'eajfj',
        })
        .expect(400);
});

it('updates the product provided the correct properties', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/products')
        .set('Cookie', cookie)
        .send({
            title: 'asdv',
            price: 40,
            quantity: 30,
            description: 'testing desc',
            category: 'eajfj',
            images: [{ url: 'asdasd', isMain: true }],
        });

    await request(app)
        .put(`/api/products/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 50,
            quantity: 30,
            description: 'testing desc',
            category: 'eajfj',
            images: [{ url: 'asdasd', isMain: true }, { url: 'new pic' }],
        })
        .expect(200);

    const product = await request(app)
        .get(`/api/products/${response.body.id}`)
        .send();

    expect(product.body.title).toEqual('new title');
    expect(product.body.price).toEqual(50);
});

it('publishes an event', async () => {
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/products')
        .set('Cookie', cookie)
        .send({
            title: 'asdv',
            price: 40,
            quantity: 30,
            description: 'testing desc',
            category: 'eajfj',
            images: [{ url: 'asdasd', isMain: true }],
        });

    await request(app)
        .put(`/api/products/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 50,
            quantity: 30,
            description: 'testing desc',
            category: 'eajfj',
            images: [{ url: 'asdasd', isMain: true }, { url: 'new pic' }],
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it.todo('returns 401 if user is not an admin');
