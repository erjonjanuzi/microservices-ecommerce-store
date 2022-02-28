import { NotFoundError, requireAuth } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { User } from '../models/user';

const router = express.Router();

router.get(
    '/api/users/:userId',
    requireAuth,
    async (req: Request, res: Response) => {
        const { userId } = req.params;

        const user = await User.findById(userId).select('-version -password');

        if (!user) {
            throw new NotFoundError();
        }
        
        res.send(user);
    }
);

export { router as getUserByIdRoute };
