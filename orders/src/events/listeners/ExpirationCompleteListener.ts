import { Listener, Subjects, ExpirationCompleteEvent, OrderStatus } from "@labcourseapp/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import { Order } from "../../models/order";
import { natsWrapper } from "../../natsWrapper";
import { OrderCancelledPublisher } from "../publishers/OrderCancelledPublisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    queueGroupName = queueGroupName;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        if (order.status === OrderStatus.AWAITINGDELIVERY) {
            return msg.ack();
        }

        order.set({
            status: OrderStatus.CANCELLED
        });

        await order.save();

        const publishingProducts = [];
        for (const product of order.products) {
            publishingProducts.push({ productId: product.product.id, quantity: product.quantity })
        }

        await new OrderCancelledPublisher(natsWrapper.client).publish({
            id: order.id,
            version: order.version,
            products: publishingProducts,
        });

        msg.ack();
    }
}