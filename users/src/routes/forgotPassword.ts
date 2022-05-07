import { BadRequestError } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { User } from '../models/user';
import randomstring from 'randomstring';
import { redisWrapper } from '../redisWrapper';
import { MailService } from '../services/MailService';

const RESET_PASSWORD_EXPIRE_TIME = 60 * 60 // 1 hour


const router = express.Router();

router.post('/api/users/forgotpassword/request', async (req: Request, res: Response) => {
    const {email} = req.body

    const user = await User.findOne({email});

    if (!user) {
        throw new BadRequestError('Account with this email does not exist');
    }

    let token = randomstring.generate();

    await redisWrapper.client.set(email, token, {
        EX: RESET_PASSWORD_EXPIRE_TIME,
    });

    token = Buffer.from(token).toString('base64');

    const resetLink = `${req.headers.host!}/forgotpassword/reset?token=${token}&email=${email}`;

    const subject = 'Reset password'
    await new MailService(process.env.SENDER_EMAIL!).send(
        email,
        subject,
        `Reset password in the link below, it expires in 60 minutes ${resetLink}`
    );

    res.send();
});

export { router as forgotPasswordRoute };
