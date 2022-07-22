import { NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Product, ProductDoc } from '../models/product';

const router = express.Router();

router.get('/api/products/getPromotedProducts', async (req: Request, res: Response) => {

    const products = await Product.find({isPromoted: true});

    res.send(products);
});

export { router as getPromotedProducts };