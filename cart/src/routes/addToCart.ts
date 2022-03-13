import {
    BadRequestError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { CartCreatedPublisher } from '../events/publishers/CartCreatedPublisher';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.post(
    '/api/cart',
    requireAuth,
    [
        body('productId')
            .not()
            .isEmpty()
            .withMessage('Product id is required')
            .isMongoId()
            .withMessage('A valid id is required'),
        body('quantity')
            .not()
            .isEmpty()
            .withMessage('Quantity is required')
            .isInt()
            .withMessage('An integer is required for quantity'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            throw new BadRequestError('Product does not exist');
        }

        // If available product stock is less than requests quantity, do not allow item to be added to cart
        if (product.quantity < quantity) {
            throw new BadRequestError(
                'The requested quantity for the product is not available'
            );
        }

        // If item already exists in cart, do not allow to be added again
        let cart = await Cart.findOne({ userId: req.currentUser!.id });
        cart?.products.forEach((cartItem) => {
            if (cartItem.product.toString() === productId) {
                throw new BadRequestError('Product is already in cart');
            }
        });

        cart = await Cart.findOneAndUpdate(
            { userId: req.currentUser?.id },
            { $push: { products: { product: productId, quantity: quantity } } },
            { upsert: true, new: true }
        );

        res.send(cart);
    }
);

export { router as addToCartRoute };
