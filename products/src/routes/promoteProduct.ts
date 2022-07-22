import {
    adminRoute,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { Product } from '../models/product';

const router = express.Router();

router.put(
    '/api/products/promote/:productId',
    requireAuth,
    adminRoute,
    [
        body('isPromoted').not().isEmpty().withMessage('Promotion value is required'),
        param('productId')
            .isMongoId()
            .withMessage('Provide a valid category id as parameter'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { productId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            throw new NotFoundError();
        }

        const { isPromoted } = req.body;

        product.set({
            isPromoted
        });
        await product.save();

        res.send(product);
    }
);

export { router as promoteProductRoute };
