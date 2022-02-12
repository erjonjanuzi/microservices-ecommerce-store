import { BadRequestError, requireAuth, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Product } from '../models/product';

const router = express.Router();

router.post(
    '/api/products',
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
        const { title, price, quantity, description, category, images } =
            req.body;

        let count = 0;
        images.forEach((image: {url: string, isMain?: boolean}) => {
            if (image.isMain) count++;
            if (count > 1) throw new BadRequestError('Only one image can be main image');
        });
            
        const product = Product.build({
            title,
            price,
            quantity,
            description,
            category,
            images,
        });
        await product.save();

        res.status(201).send(product);
    }
);

export { router as createProductRoute };
