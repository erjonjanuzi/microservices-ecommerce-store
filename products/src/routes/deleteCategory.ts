import {
    adminRoute,
    BadRequestError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import { Category } from '../models/category';

const router = express.Router();

router.delete(
    '/api/category/:categoryId',
    requireAuth,
    adminRoute,
    [
        param('categoryId')
            .isMongoId()
            .withMessage('Provide a valid category id as parameter'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);

        if (!category) {
            throw new NotFoundError();
        }

        const result = await Category.deleteOne({ _id: categoryId });

        if (result.deletedCount == 1) {
            res.status(200).send();
        }

        throw new BadRequestError(
            'Something went wrong while deleting category'
        );
    }
);

export { router as deleteCategoryRoute };
