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
import { Wishlist } from '../models/wishlist';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.post(
    '/api/wishlist',
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
            throw new BadRequestError('Product does not exist');
        }

        let wishlist = await Wishlist.findOne({ userId: req.currentUser!.id });

        // if user does not have a wishlist then create a new empty wishlist
        if (!wishlist) {
            let newWishlist = Wishlist.build({ userId: req.currentUser!.id });
            await newWishlist.save();
        }

        wishlist = await Wishlist.findOne({ userId: req.currentUser!.id });

        for (const id of wishlist!.products){
            if (id.toString() === productId){
                return res.send(wishlist);
            }
        }

        wishlist!.products.push(productId);
        await wishlist!.save();

        return res.send(wishlist);
    }
);

export { router as addtoWishlistRoute };
