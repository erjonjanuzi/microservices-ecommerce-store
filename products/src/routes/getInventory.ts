import express, { Request, Response } from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/products/inventory', async (req: Request, res: Response) => {
    const { pageNumber = 1, pageSize = 8, search, sort = 'oldest' } = req.query;

    let tokens = '';
    if (search != undefined) {
        // @ts-ignore
        tokens = search.toLowerCase().split('+').join(' ');
    }

    let products;

    let sortObj: any = {
        createdAt: 1,
    };

    if (sort === 'a-z') {
        sortObj = {
            title: 1,
        };
    } else if (sort === 'z-a') {
        sortObj = {
            title: -1,
        };
    } else if (sort === 'newest') {
        sortObj = {
            createdAt: -1,
        };
    } else if (sort === 'price:high') {
        sortObj = {
            price: -1,
        };
    } else if (sort === 'price:low') {
        sortObj = {
            price: 1,
        };
    }

    if (tokens === '') {
        products = await Product.find({})
            .limit(parseInt(pageSize as string) * 1)
            .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string))
            .sort(sortObj);

        const count = await Product.countDocuments();

        res.set(
            'Pagination',
            JSON.stringify({
                currentPage: pageNumber,
                itemsPerPage: pageSize,
                totalItems: count,
                totalPages: Math.ceil(count / parseInt(pageSize as string)),
            })
        );
    } else {
        products = await Product.find({
            $text: { $search: tokens },
        })
            .limit(parseInt(pageSize as string) * 1)
            .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string));

        const count = await Product.find({
            $text: { $search: tokens },
        }).count();

        res.set(
            'Pagination',
            JSON.stringify({
                currentPage: pageNumber,
                itemsPerPage: pageSize,
                totalItems: count,
                totalPages: Math.ceil(count / parseInt(pageSize as string)),
            })
        );
    }

    res.send(products);
});

export { router as getInventoryRoute };
