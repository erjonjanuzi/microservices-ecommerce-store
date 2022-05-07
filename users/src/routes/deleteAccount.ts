import {
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { sendAccountDeletedEmail } from '../controllers/sendAccountDeletedEmail';
import { User } from '../models/user';

const router = express.Router();

router.delete(
    '/api/users/deleteaccount',
    requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {
        const user = await User.findById(req.currentUser!.id);

        if (!user) {
            throw new NotFoundError();
        }

        if (user.id !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        await User.findByIdAndDelete(req.currentUser!.id);

        await sendAccountDeletedEmail(req.headers.host!, user.email);

        res.json({ delete: 'success' });
    }
);

export { router as deleteAccountRoute };
