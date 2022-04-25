import { requireAuth } from '@labcourseapp/common';
import express from 'express';
import { Admin } from '../models/admin';

const router = express.Router();

router.get('/api/users/allstaff', requireAuth, async (req, res) => {
    // @ts-ignore
    const { page = 1 } = parseInt(req.query);
    const limit = 8;

    const users = await Admin.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);

    const count = await Admin.countDocuments();
    const result: any = {};

    result.users = users;
    result.totalPages = Math.ceil(count / limit);
    result.currentPage = page;

    res.send(result);
});

export { router as allStaffRoute };
