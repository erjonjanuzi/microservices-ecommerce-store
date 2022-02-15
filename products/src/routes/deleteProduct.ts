import {
    BadRequestError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { Product } from '../models/product';

const router = express.Router();

router.delete(
    '/api/products/:productId',
    requireAuth,
    [
        param('productId')
            .isMongoId()
            .withMessage('Provide a valid product id as parameter'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { productId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            throw new NotFoundError();
        }

        const result = await Product.deleteOne({ _id: productId });

        if (result.deletedCount == 1) {
            res.status(200).send();
        }

        throw new BadRequestError(
            'Something went wrong while deleting the product'
        );
    }
);

export { router as deleteProductRoute };
