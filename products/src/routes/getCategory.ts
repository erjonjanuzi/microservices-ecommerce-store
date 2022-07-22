import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    requireAuth,
    adminRoute,
    NotFoundError
} from '@labcourseapp/common';
import { Category } from '../models/category';

const router = express.Router();

router.get('/api/category/:categoryId', requireAuth, adminRoute, validateRequest, async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.categoryId);

    if (!category){
        throw new NotFoundError();
    }
    
    res.send(category);
});

export { router as getCategoryRoute };