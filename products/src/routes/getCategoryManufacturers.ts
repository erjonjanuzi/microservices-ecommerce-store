import { NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Product, ProductDoc } from '../models/product';

const router = express.Router();

router.get('/api/products/getManufacturersByCategory/:categoryName', async (req: Request, res: Response) => {
    const { categoryName } = req.params;

    let filter: FilterQuery<ProductDoc> = {};

    if (categoryName?.toLowerCase() !== 'all'){
        filter = {
            category: categoryName
        }
    }

    const categories = await Product.distinct('manufacturer', filter);

    res.send(categories);
});

export { router as getManufacturersByCategory };
