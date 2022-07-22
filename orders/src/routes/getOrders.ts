import express, { Request, Response } from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.get(
    '/api/orders',
    async (req: Request, res: Response) => {
        const { pageNumber = 1, pageSize = 8, search, sort = 'oldest' } = req.query;

        let tokens = '';
        if (search != undefined) {
            // @ts-ignore
            tokens = search.toLowerCase().split('+').join(' ');
        }

        let sortObj: any = {
            createdAt: 1,
        };

        if (sort === 'newest') {
            sortObj = {
                createdAt: -1,
            };
        } else if (sort === 'price:high') {
            sortObj = {
                totalPrice: -1,
            };
        } else if (sort === 'price:low') {
            sortObj = {
                totalPrice: 1,
            };
        }

        let orders;

        if (tokens === '') {
            orders = await Order.find({})
                .limit(parseInt(pageSize as string) * 1)
                .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string))
                .sort(sortObj);
    
            const count = await Order.countDocuments();
    
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
            orders = await Order.find({
                $text: { $search: tokens },
            })
                .limit(parseInt(pageSize as string) * 1)
                .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string));
    
            const count = await Order.find({
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

        res.send(orders)
    }
);

export { router as getOrders }