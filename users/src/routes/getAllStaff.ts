import { requireAuth } from '@labcourseapp/common';
import express from 'express';
import { Admin } from '../models/admin';

const router = express.Router();

router.get('/api/users/allstaff', requireAuth, async (req, res) => {
    const users = await Admin.find({});

    res.send(users);
});

export { router as allStaffRoute};