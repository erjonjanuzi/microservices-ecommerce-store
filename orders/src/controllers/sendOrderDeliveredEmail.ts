import { OrderDoc } from '../models/order';
import { MailService } from '../services/MailService';
import { orderDelivered } from '../templates/orderDelivered';


export async function sendOrderDeliveredEmail(order: OrderDoc) {

    const subject = `Order No. #${order.orderNo} was delivered`
    const html = orderDelivered(order);

    await new MailService(process.env.SENDER_EMAIL!).send(
        order.contact.email,
        subject,
        html
    );
}
