import {
    Listener,
    Subjects,
    ProductUpdatedEvent,
    NotFoundError,
} from '@labcourseapp/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/product';
import { queueGroupName } from './queueGroupName';

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
    subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
        const product = await Product.findOne({
            id: data.id,
            version: data.version - 1,
        });

        if (!product) {
            throw new NotFoundError();
        }

        const { title, price, quantity, sale } = data;
        product.set({ title, price, quantity, sale })
        await product.save()

        msg.ack()
    }
}
