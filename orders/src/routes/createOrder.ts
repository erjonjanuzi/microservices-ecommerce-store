import { BadRequestError, OrderStatus, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { OrderCreatedPublisher } from '../events/publishers/OrderCreatedPublisher';
import { Order } from '../models/order';
import { Product, ProductDoc } from '../models/product';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 2 * 60;

router.post(
    '/api/orders',
    [
        body('items')
            .not()
            .isEmpty()
            .withMessage('Products are required')
            .isArray()
            .withMessage('A valid products array is required'),
        body('contact')
            .not()
            .isEmpty()
            .withMessage('Contact information is required'),
        body('contact.email')
            .not()
            .isEmpty()
            .withMessage('Email is required to create order')
            .isEmail()
            .withMessage('A valid email is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { items, contact } = req.body;

        const products: { product: any, quantity: number }[] = [] as { product: any, quantity: number }[];

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                throw new BadRequestError('Product does not exist');
            }

            if (item.quantity > product.quantity) {
                throw new BadRequestError('Requested quantity is not available');
            }
            
            // @ts-ignore
            products.push({
                product: {
                    id: product._id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    quantity: product.quantity,
                    sale: product.sale
                }, quantity: item.quantity
            });
        }

        // Calculate an expiration date for this order
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

        const order = Order.build({
            products,
            contact,
            status: OrderStatus.CREATED,
            expiresAt: expiration,
            ...(req.currentUser?.id && { userId: req.currentUser.id })
        });
        await order.save()

        const publishingProducts: { productId: string, quantity: number }[] = [];
        for (const item of items) {
            // @ts-ignore
            publishingProducts.push(item);
        }

        await new OrderCreatedPublisher(natsWrapper.client).publish({
            id: order.id,
            products: publishingProducts,
            version: order.version,
            status: order.status,
            userId: order.userId,
            totalPrice: order.totalPrice,
            expiresAt: order.expiresAt.toISOString(),
        });

        res.send(order)
    }
);

export { router as createOrderRoute }