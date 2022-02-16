import { NotFoundError, requireAuth, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Cart } from '../models/cart';

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
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { productId } = req.body;

        const cart = await Cart.findOne({ userId: req.currentUser!.id}).populate('products.product');

        console.log('cart', cart);
        if (!cart){
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

export { router as removeFromCartRoute};