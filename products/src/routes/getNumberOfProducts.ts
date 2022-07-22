import { NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Product, ProductDoc } from '../models/product';

const router = express.Router();

router.get('/api/products/getNumberOfProducts', async (req: Request, res: Response) => {
    const count = await Product.find().count();

    res.json(count);
});

export { router as getNumberOfProducts };