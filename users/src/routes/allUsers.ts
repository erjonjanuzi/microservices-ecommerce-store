import { requireAuth } from '@labcourseapp/common';
import express from 'express';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/users', requireAuth, async (req, res) => {
    const users = await User.find({});

    res.send(users);
});

export { router as allUsersRoute};