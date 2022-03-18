import { ProductUpdatedEvent } from '@labcourseapp/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Product } from '../../../models/product';
import { natsWrapper } from '../../../natsWrapper';
import { ProductUpdatedListener } from '../ProductUpdatedListener';

const setup = async () => {
    // create a listener
    const listener = new ProductUpdatedListener(natsWrapper.client)

    const product = Product.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'product',
        price: 20,
        quantity: 10,
        sale: 0
    });
    await product.save();

    // create a fake data object
    const data: ProductUpdatedEvent['data'] = {
        id: product.id,
        version: product.version + 1,
        title: 'new product',
        price: 999,
        quantity: 50,
        sale: 0.20
    }

    // create a fake msg object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    // return all consts creatd above
    return { msg, data, listener, product };
}

it('finds, updates, and saves a product', async () => {
    const { msg, data, product, listener } = await setup();

    await listener.onMessage(data, msg);

    const updatedProduct = await Product.findById(product.id);

    expect(updatedProduct!.title).toEqual(data.title);
    expect(updatedProduct!.price).toEqual(data.price);
    expect(updatedProduct!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { msg, data, listener } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
    const { msg, data, listener } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (err) {}

    expect(msg.ack).not.toHaveBeenCalled();
})