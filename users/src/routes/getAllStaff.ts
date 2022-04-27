import { requireAuth } from '@labcourseapp/common';
import express from 'express';
import { Admin } from '../models/admin';

const router = express.Router();

router.get('/api/users/allstaff', requireAuth, async (req, res) => {
    const { pageNumber = 1, pageSize = 8 } = req.query;

    const users = await Admin.find()
        .limit(parseInt(pageSize as string) * 1)
        .skip((parseInt(pageNumber as string) - 1) * parseInt(pageSize as string));

    const count = await Admin.countDocuments();

    res.set(
        'Pagination',
        JSON.stringify({
            currentPage: pageNumber,
            itemsPerPage: pageSize,
            totalItems: count,
            totalPages: Math.ceil(count / parseInt(pageSize as string)),
        })
    );

    res.send(users);
});

export { router as allStaffRoute };
