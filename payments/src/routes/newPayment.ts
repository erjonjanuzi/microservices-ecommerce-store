import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    NotAuthorizedError,
    OrderStatus,
    BadRequestError} from '@labcourseapp/common';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/PaymentCreatedPublisher';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.post('/api/payments', [
    body('token')
        .not()
        .isEmpty(),
    body('orderId')
        .not()
        .isEmpty()
], validateRequest, async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser?.id) {
        throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.CANCELLED) {
        throw new BadRequestError('Cannot pay for a cancelled order');
    }

    const charge = await stripe.charges.create({
        currency: 'eur',
        amount: order.totalPrice * 100,
        source: token,
        description: `Payment of order in Zebra51 Store`
    });
    const payment = Payment.build({
        orderId,
        stripeId: charge.id
    });
    await payment.save();

    await new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        stripeId: payment.stripeId,
        orderId: payment.orderId
    });

    res.status(201).send({ id: payment.id });
});

export { router as createChargeRouter };