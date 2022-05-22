import { Listener, ProductCreatedEvent, Subjects } from '@labcourseapp/common';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/product';
import { queueGroupName } from './queueGroupName';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
    subject: Subjects.ProductCreated = Subjects.ProductCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
        const { id, title, image, price, quantity, sale } = data;

        const product = Product.build({
            id,
            title,
            image,
            price,
            quantity,
            sale,
        });
        await product.save();

        msg.ack();
    }
}
