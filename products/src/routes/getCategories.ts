import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    requireAuth,
    adminRoute
} from '@labcourseapp/common';
import { Category } from '../models/category';

const router = express.Router();

router.get('/api/category', requireAuth, adminRoute, validateRequest, async (req: Request, res: Response) => {
    const categories = await Category.find({});

    res.send(categories);
});

export { router as getCategoriesRoute };