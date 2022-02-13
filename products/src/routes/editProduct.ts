import {
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Product } from '../models/product';

const router = express.Router();

router.put(
    '/api/products/:productId',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than zero'),
        body('quantity').not().isEmpty().withMessage('Quantity is required'),
        body('quantity').isInt().withMessage('Quantity must be a whole number'),
        body('description')
            .not()
            .isEmpty()
            .withMessage('Description is required'),
        body('category').not().isEmpty().withMessage('Category is required'),
        body('images')
            .isArray({ min: 1 })
            .withMessage('At least one image is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            throw new NotFoundError();
        }

        const { title, price, quantity, description, category, images } =
            req.body;

        product.set({
            title,
            price,
            quantity,
            description,
            category,
            images,
        });
        await product.save();

        res.send(product);
    }
);

export { router as editProductRoute };
