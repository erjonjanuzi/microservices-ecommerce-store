import { BadRequestError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { redisWrapper } from '../redisWrapper';
import { MailService } from '../services/MailService';
import { Password } from '../services/Password';

const router = express.Router();

router.post('/api/users/forgotpassword/reset', async (req: Request, res: Response) => {
    let { email, token, newPassword } = req.body;

    if (!token || !email || !newPassword) {
        throw new BadRequestError('Something went wrong');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new BadRequestError('Account with the provided email does not exist');
    }

    const userToken = await redisWrapper.client.get(user.email);

    if (!userToken) {
        throw new BadRequestError('Token has expired');
    }

    token = Buffer.from(token, 'base64').toString('ascii');
    if (token !== userToken) {
        throw new BadRequestError('Could not reset password');
    }

    const passwordsMatch = await Password.compare(user.password, newPassword);

    if (passwordsMatch) {
        throw new BadRequestError('New password cannot be the same as the old password');
    }

    user.set({ password: newPassword });
    await user.save();

    const subject = 'Your password has been reset'
    await new MailService(process.env.SENDER_EMAIL!).send(
        email,
        subject,
        `You are receiving this email based on your activity you recently reset your password`
    );

    res.send();
});

export { router as resetPasswordRoute };
