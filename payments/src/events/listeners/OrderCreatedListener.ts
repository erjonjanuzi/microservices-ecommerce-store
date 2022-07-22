import { Listener, Subjects, OrderCreatedEvent } from "@labcourseapp/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){
        const order = Order.build({
            id: data.id,
            totalPrice: data.totalPrice,
            status: data.status,
            userId: data.userId,
            version: data.version
        });
        await order.save();

        msg.ack();
    }
}