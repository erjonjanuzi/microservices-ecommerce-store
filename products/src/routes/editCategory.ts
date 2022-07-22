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
import { Category } from '../models/category';
import { natsWrapper } from '../natsWrapper';

const router = express.Router();

router.put(
    '/api/category/:categoryId',
    requireAuth,
    adminRoute,
    [
        body('categoryName').not().isEmpty().withMessage('Category name is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const category = await Category.findById(req.params.categoryId);

        if (!category) {
            throw new NotFoundError();
        }

        const { categoryName } =
            req.body;

        category.set({
            categoryName
        });
        await category.save();


        res.send(category);
    }
);

export { router as editCategoryRoute };
