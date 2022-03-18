import { ProductCreatedEvent } from '@labcourseapp/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Product } from '../../../models/product';
import { natsWrapper } from '../../../natsWrapper';
import { ProductCreatedListener } from '../ProductCreatedListener';

const setup = async () => {
    // create an instance of the listener
    const listener = new ProductCreatedListener(natsWrapper.client);

    // create a fake data event
    const data: ProductCreatedEvent['data'] = {
        version: 0,
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'product title',
        price: 10,
        quantity: 2,
        sale: 0.05
    };

    // create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return { listener, data, msg };
};

it('creates and saves a product', async () => {
    const { listener, data, msg } = await setup();

    // call the onMessage function with the data object + message object
    listener.onMessage(data, msg);

    // write assertions to make sure a ticket was created
    const product = await Product.findById(data.id);

    expect(product).toBeDefined();
    expect(product!.title).toEqual(data.title);
    expect(product!.price).toEqual(data.price);
});

it('acks the message', async () => {
    const { data, listener, msg } = await setup();

    // call the onMessage function with the data object + message object
    listener.onMessage(data, msg);

    // write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
});
