import { BadRequestError, NotFoundError, OrderStatus, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { sendOrderDeliveredEmail } from '../controllers/sendOrderDeliveredEmail';
import { sendOrderInTransitEmail } from '../controllers/sendOrderInTransitEmail';
import { OrderCancelledPublisher } from '../events/publishers/OrderCancelledPublisher';
import { OrderCreatedPublisher } from '../events/publishers/OrderCreatedPublisher';
import { Order } from '../models/order';
import { Product, ProductDoc } from '../models/product';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.put(
    '/api/orders/:orderId',
    [
        body('status')
            .not()
            .isEmpty()
            .withMessage('Products are required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { status } = req.body;
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }

        const currentDate = new Date().getTime();
        const orderExpirationDate = new Date(order.expiresAt).getTime();

        const difference = currentDate - orderExpirationDate;

        if (difference < 0){
            throw new BadRequestError('You cannot update the status because this order was created in the last 2 minutes');
        }

        if (status === OrderStatus.AWAITINGDELIVERY) {
            order.set({
                status: OrderStatus.AWAITINGDELIVERY
            })
        } else if (status === OrderStatus.DELIVERED) {
            order.set({
                status: OrderStatus.DELIVERED
            })
        } else if (status === OrderStatus.INTRANSIT) {
            order.set({
                status: OrderStatus.INTRANSIT
            })
        } else if (status === OrderStatus.CANCELLED) {
            order.set({
                status: OrderStatus.CANCELLED
            })
        }
        await order.save();

        if (status === OrderStatus.CANCELLED) {
            const publishingProducts = [];
            for (const product of order.products) {
                publishingProducts.push({ productId: product.product.id, quantity: product.quantity })
            }

            await new OrderCancelledPublisher(natsWrapper.client).publish({
                id: order.id,
                version: order.version,
                products: publishingProducts,
            });
        }

        if (status === OrderStatus.DELIVERED) {
            await sendOrderDeliveredEmail(order);
        } else if (status === OrderStatus.INTRANSIT){
            await sendOrderInTransitEmail(order);
        }

        res.send(order)
    }
);

export { router as updateOrderStatus }