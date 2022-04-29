import { requireAuth, Roles } from '@labcourseapp/common';
import express from 'express';
import { Admin } from '../models/admin';

const router = express.Router();

router.get('/api/users/allstaff', requireAuth, async (req, res) => {
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

    if (tokens == '') {
        users = await Admin.find({
            _id: { $nin: [req.currentUser!.id] },
            role: Roles.ADMIN,
        })
            .limit(parseInt(pageSize as string) * 1)
            .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string))
            .sort(sortObj);

        const count = (await Admin.countDocuments()) - 1; // remove one element that represents the current admin making the request

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
        users = await Admin.find({
            $text: { $search: tokens },
            _id: { $nin: [req.currentUser!.id] },
            role: Roles.ADMIN,
        })
            .limit(parseInt(pageSize as string) * 1)
            .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string));

        const count = await Admin.find({
            $text: { $search: tokens },
            _id: { $nin: [req.currentUser!.id] },
            role: Roles.ADMIN,
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

export { router as allStaffRoute };
