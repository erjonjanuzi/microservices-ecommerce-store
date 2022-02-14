import { NotFoundError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/products/:productId', async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
        throw new NotFoundError();
    }

    res.send(product);
});

export { router as getProductRoute };
