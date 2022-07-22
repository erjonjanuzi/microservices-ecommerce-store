import {
    BadRequestError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

const router = express.Router();

router.put(
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

        let cart = await Cart.findOne({ userId: req.currentUser!.id }).populate("products.product");

        if (!cart){
            throw new BadRequestError("Something went wrong")
        }

        const cartItems = cart.products.map(cartItem => {
            if (cartItem.product._id.toString() === productId) {
                cartItem.quantity = quantity
            }
            return cartItem;
        });

        cart.set({
            products: cartItems
        });
        await cart.save();

        res.send(cart);
    }
);

export { router as updateCartItemQuantityRoute };
