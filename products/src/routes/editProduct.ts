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
    '/api/products/update/:productId',
    requireAuth,
    adminRoute,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('manufacturer').not().isEmpty().withMessage('Manufacturer is required'),
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
        body('sale').not().isEmpty().withMessage('Sale is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {productId} = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            throw new NotFoundError();
        }

        const { title, manufacturer, price, quantity, description, category, sale } =
            req.body;

        product.set({
            title,
            manufacturer,
            price,
            quantity,
            description,
            category,
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
