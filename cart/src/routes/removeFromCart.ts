import { BadRequestError, NotFoundError, requireAuth, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

const router = express.Router();

router.put(
    '/api/cart/removeItem',
    requireAuth,
    [
        body('productId')
            .not()
            .isEmpty()
            .withMessage('Product id is required')
            .isMongoId()
            .withMessage('A valid id is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            throw new BadRequestError('Product requested for removal does not exist');
        }

        const cart = await Cart.findOne({ userId: req.currentUser!.id }).populate('products.product');

        if (!cart) {
            throw new NotFoundError();
        }

        const cartItems = cart.products.filter(cartItem => cartItem.product.id !== productId);

        cart.set({
            products: cartItems
        });

        await cart.save();

        res.send(cart);
    }
);

export { router as removeFromCartRoute };