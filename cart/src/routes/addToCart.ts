import {
    BadRequestError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { CartUpdatedPublisher } from '../events/publishers/CartUpdatedPublisher';
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
            .isInt({ min: 1 })
            .withMessage('A number greater than 0 is required for quantity'),
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
        ).populate('products.product');

        if (!cart) {
            throw new BadRequestError("Something went wrong")
        }

        const products = [] as { id: string, title: string }[]
        cart.products.forEach(cartItem => {
            const product = {
                id: cartItem.product.id,
                title: cartItem.product.title
            }
            products.push(product)
        })
        await cart.save();

        return res.send(cart);
    }
);

export { router as addToCartRoute };
