import {
    adminRoute,
    BadRequestError,
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
    Roles,
    validateRequest,
} from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Admin } from '../models/admin';
import { User } from '../models/user';

const router = express.Router();

router.delete(
    '/api/users/deleteaccount',
    requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {
        const user = await User.findByIdAndDelete(req.currentUser!.id);

        if (!user) {
            throw new NotFoundError();
        }

        if (user.id !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        res.json({ delete: 'success' });
    }
);

export { router as deleteAccountRoute };
