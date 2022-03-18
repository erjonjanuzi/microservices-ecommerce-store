import {
    adminRoute,
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
    Roles,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { ProductUpdatedPublisher } from '../events/publishers/ProductUpdatedPublisher';
import { Product } from '../models/product';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.put(
    '/api/products/:productId',
    requireAuth,
    adminRoute,
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

        const { title, price, quantity, description, category, images, sale } =
            req.body;

        product.set({
            title,
            price,
            quantity,
            description,
            category,
            images,
            sale,
        });
        await product.save();

        new ProductUpdatedPublisher(natsWrapper.client).publish({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            sale: product.sale,
            version: product.version,
        });

        res.send(product);
    }
);

export { router as editProductRoute };
