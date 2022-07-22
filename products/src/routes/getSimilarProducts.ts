import { NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Product, ProductDoc } from '../models/product';

const router = express.Router();

router.get('/api/products/getSimilarProducts/:productId', async (req: Request, res: Response) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        throw new NotFoundError();
    }

    let similarProductsByCategory = await Product.find({ category: product.category, _id: { $ne: productId } })

    similarProductsByCategory = similarProductsByCategory.slice(0, 5);

    res.send(similarProductsByCategory);
});

export { router as getSimilarProducts };