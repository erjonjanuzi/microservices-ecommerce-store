import { requireAuth } from '@labcourseapp/common';
import express from 'express';
import { User } from '../models/user';
console.log('test');
const router = express.Router();

router.get('/api/users/all', requireAuth, async (req, res) => {
    const users = await User.find({});

    res.send(users);
});

export { router as allUsersRoute};