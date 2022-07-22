import {
    BadRequestError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { CartUpdatedPublisher } from '../events/publishers/CartUpdatedPublisher';
import { Cart } from '../models/cart';
import { Wishlist } from '../models/wishlist';

const router = express.Router();

router.get(
    '/api/wishlist/clear',
    requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {
        const wishlist = await Wishlist.findOne({ userId: req.currentUser!.id });
        
        if (!wishlist) {
            throw new BadRequestError('wishlist does not exist');
        }

        wishlist.set({
            products: []
        });
        await wishlist.save();

        return res.send(wishlist);
    }
);

export { router as clearWishlistRoute };
