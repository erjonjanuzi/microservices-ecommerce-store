import { Listener, Subjects, OrderCancelledEvent, OrderStatus } from "@labcourseapp/common";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/product";
import { ProductUpdatedPublisher } from "../publishers/ProductUpdatedPublisher";
import { queueGroupName } from "./queueGroupName";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
        const { products } = data;

        for (const orderItem of products){
            const product = await Product.findById(orderItem.productId);
            
            if (!product){
                throw new Error('Product not found');
            }
        
            product.set({
                quantity: product.quantity + orderItem.quantity
            });
            await product.save();

            await new ProductUpdatedPublisher(this.client).publish({
                id: product.id,
                price: product.price,
                title: product.title,
                version: product.version,
                quantity: product.quantity,
                sale: product.sale,
            });
        }
        
        // Ack the message
        msg.ack();
    }
}