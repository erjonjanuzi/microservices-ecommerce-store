import { BadRequestError, requireAuth, validateRequest, adminRoute } from '@labcourseapp/common';
import express, { Request, Response, Express } from 'express';
import { body } from 'express-validator';
import { ProductCreatedPublisher } from '../events/publishers/ProductCreatedPublisher';
import { Image, Product } from '../models/product';
import { natsWrapper } from '../natsWrapper';
import { upload } from '../utils/multer';
import { cloudinaryUploader } from '../utils/cloudinaryUploader';

const router = express.Router();

const validationMiddleware = [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than zero'),
    body('quantity')
        .not()
        .isEmpty()
        .withMessage('Quantity is required')
        .isInt()
        .withMessage('Quantity must be a whole number'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('category').not().isEmpty().withMessage('Category is required'),
];

router.post(
    '/api/products',
    requireAuth,
    adminRoute,
    upload.array('images'),
    validationMiddleware,
    validateRequest,
    async (req: Request, res: Response) => {
        const { title, price, sale, quantity, description, category } = req.body;
        const images = [] as Image[];
        const files = req.files;
        
        if (files?.length === 0) {
            throw new BadRequestError('At least one image is required for the product');
        }

        // @ts-ignore
        for (const file of files) {
            const { path } = file;
            const uploadResult = await cloudinaryUploader(path, {
                use_filename: true,
                folder: 'products',
            });
            images.push({
                url: uploadResult.url,
            });
        }

        // create the product
        const product = Product.build({
            title,
            price,
            sale,
            quantity,
            description,
            category,
            images,
        });
        await product.save();

        // Publish the product created event
        await new ProductCreatedPublisher(natsWrapper.client).publish({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            sale: product.sale,
            version: product.version,
        });

        res.status(201).send(product);
    }
);

export { router as createProductRoute };
