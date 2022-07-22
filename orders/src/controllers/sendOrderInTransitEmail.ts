import { OrderDoc } from '../models/order';
import { MailService } from '../services/MailService';
import { orderInTransit } from '../templates/orderInTransit';

export async function sendOrderInTransitEmail(order: OrderDoc) {

    const subject = `Order No. #${order.orderNo} is on its way`
    const html = orderInTransit(order);

    await new MailService(process.env.SENDER_EMAIL!).send(
        order.contact.email,
        subject,
        html
    );
}
