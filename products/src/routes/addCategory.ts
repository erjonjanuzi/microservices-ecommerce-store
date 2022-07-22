import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    requireAuth,
    adminRoute
} from '@labcourseapp/common';
import { Category } from '../models/category';

const router = express.Router();

router.post('/api/category', requireAuth, adminRoute, [
    body('categoryName')
        .not()
        .isEmpty()
        .withMessage('A valid name is required'),
], validateRequest, async (req: Request, res: Response) => {
    const { categoryName } = req.body;

    const category = Category.build({categoryName});

    await category.save();

    res.send(category);
});

export { router as addCategoryRoute };