import { NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/cart/products', async (req: Request, res: Response) => {
    const products = await Product.find({});

    res.send(products);
});

export { router as productsTestRoute };