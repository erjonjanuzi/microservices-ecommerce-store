import { requireAuth, Roles } from '@labcourseapp/common';
import express from 'express';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/users/customers', requireAuth, async (req, res) => {
    const { pageNumber = 1, pageSize = 8, search, sort = 'oldest' } = req.query;

    let tokens = '';
    if (search != undefined) {
        // @ts-ignore
        tokens = search.toLowerCase().split('+').join(' ');
    }

    let users;

    let sortObj: any = {
        createdAt: 1,
    };

    if (sort === 'a-z') {
        sortObj = {
            firstName: 1,
        };
    } else if (sort === 'z-a') {
        sortObj = {
            firstName: -1,
        };
    } else if (sort === 'newest') {
        sortObj = {
            createdAt: -1,
        };
    }

    if (tokens === '') {
        users = await User.find({
            role: Roles.USER,
        })
            .limit(parseInt(pageSize as string) * 1)
            .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string))
            .sort(sortObj);

        const count = await User.countDocuments({role: Roles.USER})

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
        users = await User.find({
            $text: { $search: tokens },
            role: Roles.USER,
        })
            .limit(parseInt(pageSize as string) * 1)
            .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string));

        const count = await User.find({
            $text: { $search: tokens },
            role: Roles.USER,
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

    res.send(users);
});

export { router as allCustomersRoute };
