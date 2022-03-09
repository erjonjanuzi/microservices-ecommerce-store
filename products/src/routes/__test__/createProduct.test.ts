import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import { natsWrapper } from '../../natsWrapper';
import { Roles } from '@labcourseapp/common';

it('has a route handler listening to /api/products for post requests', async () => {
    const response = await request(app).post('/api/products').send({});

    expect(response.status).not.toEqual(404);
});

it('returns status 401 if user is not authenticated', async () => {
    await request(app).post('/api/products').send({}).expect(401);
});

it('returns 401 if user role is not admin', async () => {
    await request(app)
        .post('/api/products')
        .set('Cookie', global.signin())
        .send({})
        .expect(401);
});

it('returns 400 if no valid title, price, quantity, description, category or images is provided', async () => {
    await request(app)
        .post('/api/products')
        .set('Cookie', global.signin(Roles.ADMIN))
        .send({
            price: 20,
            quantity: 30,
            description: 'asdasdd',
            category: 'other',
            images: [{ url: 'image.png', isMain: true }],
        })
        .expect(400);

    await request(app)
        .post('/api/products')
        .set('Cookie', global.signin(Roles.ADMIN))
        .send({
            title: 'asdav',
            quantity: 30,
            description: 'asdasdd',
            category: 'other',
            images: [{ url: 'image.png', isMain: true }],
        })
        .expect(400);

    await request(app)
        .post('/api/products')
        .set('Cookie', global.signin(Roles.ADMIN))
        .send({
            title: 'asdav',
            price: 20,
            description: 'asdasdd',
            category: 'other',
            images: [{ url: 'image.png', isMain: true }],
        })
        .expect(400);

    await request(app)
        .post('/api/products')
        .set('Cookie', global.signin(Roles.ADMIN))
        .send({
            title: 'asdav',
            price: 20,
            quantity: 30,
            category: 'other',
            images: [{ url: 'image.png', isMain: true }],
        })
        .expect(400);

    await request(app)
        .post('/api/products')
        .set('Cookie', global.signin(Roles.ADMIN))
        .send({
            title: 'asdav',
            price: 20,
            quantity: 30,
            description: 'asdasdd',
            images: [{ url: 'image.png', isMain: true }],
        })
        .expect(400);

    await request(app)
        .post('/api/products')
        .set('Cookie', global.signin(Roles.ADMIN))
        .send({
            title: 'asdav',
            price: 20,
            quantity: 30,
            description: 'asdasdd',
            category: 'sdasd',
        })
        .expect(400);
});

it('creates a product if provided with valid inputs', async () => {
    const cookie = global.signin(Roles.ADMIN);

    const title = 'title';
    const price = 50;

    await request(app)
        .post('/api/products')
        .set('Cookie', cookie)
        .attach('images', global.getMockImage())
        .field({
            title,
            price,
            quantity: 30,
            description: 'This is a descr',
            category: 'other',
        })
        .expect(201);

    const products = await Product.find({});

    expect(products.length).toEqual(1);
    expect(products[0].title).toEqual(title);
    expect(products[0].price).toEqual(price);
});

it('publishes an event', async () => {
    await request(app)
        .post('/api/products')
        .set('Cookie', global.signin(Roles.ADMIN))
        .attach('images', global.getMockImage())
        .field({
            title: 'title',
            price: 178,
            quantity: 30,
            description: 'This is a descr',
            category: 'other',
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
