import { NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Product, ProductDoc } from '../models/product';

const router = express.Router();

router.get('/api/products/getProductsOnSale', async (req: Request, res: Response) => {
    let products = await Product.find().sort({sale: -1});

    products = products.slice(0, 10);

    res.send(products);
});

export { router as getProductsOnSale };