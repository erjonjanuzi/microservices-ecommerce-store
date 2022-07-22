import {
    BadRequestError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { CartUpdatedPublisher } from '../events/publishers/CartUpdatedPublisher';
import { Cart } from '../models/cart';

const router = express.Router();

router.get(
    '/api/cart/clear',
    requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {
        const cart = await Cart.findOne({ userId: req.currentUser!.id });
        
        if (!cart) {
            throw new BadRequestError('Cart does not exist');
        }
        
        cart.set({
            products: []
        });
        await cart.save();

        return res.send(cart);
    }
);

export { router as clearCartRoute };
