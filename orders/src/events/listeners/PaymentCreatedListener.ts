import { Listener, Subjects, PaymentCreatedEvent, OrderStatus } from "@labcourseapp/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import { Order } from "../../models/order";
import { sendOrderConfirmationEmail } from "../../controllers/sendOrderConfirmationEmail";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);

        if(!order){
            throw new Error('Order not found');
        }

        order.set({
            status: OrderStatus.AWAITINGDELIVERY
        });
        await order.save();

        await sendOrderConfirmationEmail(order);

        msg.ack();
    }
}