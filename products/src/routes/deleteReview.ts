import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    Roles,
    NotAuthorizedError
} from '@labcourseapp/common';
import { natsWrapper } from '../natsWrapper';
import { Product } from '../models/product';

const router = express.Router();

router.put('/api/products/deleteReview', requireAuth, [
    body('reviewId')
        .not()
        .isEmpty()
        .isMongoId()
        .withMessage('A valid id is required'),
    body('productId')
        .not()
        .isEmpty()
        .isMongoId()
        .withMessage('A valid id is required'),
], validateRequest, async (req: Request, res: Response) => {
    const { reviewId, productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        throw new NotFoundError();
    }


    let review = {} as {
        _id: string;
        userId: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
        comment?: string | undefined;
        rating: number;
    };

    product.reviews.map((productReview) => {
        if (productReview._id == reviewId) review = productReview;
    })

    if (review.userId != req.currentUser!.id && req.currentUser!.role !== Roles.ADMIN) {
        throw new NotAuthorizedError();
    }

    // @ts-ignore
    const reviews = product.reviews.filter((productReview) => productReview._id != review._id);

    product.set({
        reviews
    })
    await product.save();
    
    if (reviews.length === 0){
        product.set({
            rating: 0
        });
        await product.save();
    }

    res.send(product);
});

export { router as deleteReviewRoute };