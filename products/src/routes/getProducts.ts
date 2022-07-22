import express, { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Product, ProductDoc } from '../models/product';

const router = express.Router();

router.get('/api/products', async (req: Request, res: Response) => {
    const { pageNumber = 1, pageSize = 8, category, sort, search, manufacturers } = req.query;

    let products;

    let tokens = '';
    if (search != undefined) {
        // @ts-ignore
        tokens = search.toLowerCase().split('+').join(' ');
    }

    if (tokens === '') {
        let filter: FilterQuery<ProductDoc> = {}

        if (category !== 'all' && category !== undefined) {
            filter = {
                category
            }
        }

        let manufacturerTokens;
        if (manufacturers !== undefined) // @ts-ignore
            manufacturerTokens = manufacturers.split('+')

        if (manufacturerTokens?.length !== 0 && manufacturerTokens !== undefined){
            filter = {
                manufacturer: {$in: manufacturerTokens}
            }
        }

        let sortObj: any = {};

        if (sort === 'high') {
            sortObj = {
                price: -1,
            };
        } else if (sort === 'low') {
            sortObj = {
                price: 1,
            };
        }

        products = await Product.find(filter)
            .limit(parseInt(pageSize as string) * 1)
            .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string))
            .sort(sortObj)

        const count = await Product.find(filter).count();

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

export { router as getProductsRoute };