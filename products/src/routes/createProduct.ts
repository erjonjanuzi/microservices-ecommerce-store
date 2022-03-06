import { BadRequestError, currentUser, NotAuthorizedError, requireAuth, Roles, validateRequest, adminRoute } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { ProductCreatedPublisher } from '../events/publishers/ProductCreatedPublisher';
import { Product } from '../models/product';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.post(
    '/api/products',
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

        await new ProductCreatedPublisher(natsWrapper.client).publish({
            id: product.id,
            version: product.version,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            category: product.category,
            rating: product.rating,
            sale: product.sale,
            images: product.images
        })

        res.status(201).send(product);
    }
);

export { router as createProductRoute };
