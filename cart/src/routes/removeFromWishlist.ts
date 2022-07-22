import { BadRequestError, NotFoundError, requireAuth, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { Wishlist } from '../models/wishlist';

const router = express.Router();

router.put(
    '/api/wishlist/removeItem',
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

        const wishlist = await Wishlist.findOne({ userId: req.currentUser!.id });

        if (!wishlist) {
            throw new NotFoundError();
        }

        const wishlistProducts = wishlist.products.filter(id => id.toString() !== productId);

        wishlist.set({
            products: wishlistProducts
        });

        await wishlist.save();

        res.send(wishlist);
    }
);

export { router as removeFromWishlistRoute };