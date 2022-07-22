import { OrderDoc } from '../models/order';
import { MailService } from '../services/MailService';
import { orderConfirmation } from '../templates/orderConfirmation';

export async function sendOrderConfirmationEmail(order: OrderDoc) {

    const subject = 'Order Confirmation'
    const html = orderConfirmation(order);

    await new MailService(process.env.SENDER_EMAIL!).send(
        order.contact.email,
        subject,
        html
    );
}
