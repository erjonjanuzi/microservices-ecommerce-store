import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth
} from '@labcourseapp/common';
import { natsWrapper } from '../natsWrapper';
import { Product } from '../models/product';

const router = express.Router();

router.post('/api/products/addReview', requireAuth, [
    body('productId')
        .not()
        .isEmpty()
        .isMongoId()
        .withMessage('A valid id is required'),
    body('review')
        .not()
        .isEmpty(),
    body('review.rating')
        .not()
        .isEmpty()
        .isInt({ min: 1, max: 5 })
], validateRequest, async (req: Request, res: Response) => {
    const { productId, review } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        throw new NotFoundError();
    }

    review.userId = req.currentUser!.id

    const reviews = product.reviews;
    reviews.push(review);

    product.set({
        reviews
    })
    await product.save();

    res.send(product);
});

export { router as addReviewRoute };