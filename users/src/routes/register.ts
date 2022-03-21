import { BadRequestError, validateRequest } from '@labcourseapp/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Roles } from '@labcourseapp/common';
import { TokenService } from '../services/TokenService';
import nodemailer from 'nodemailer';

const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
        user: 'erjonjanuzi2018@gmail.com',
        pass: '',
    },
};
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

const router = express.Router();

router.post(
    '/api/users/register',
    [
        body('firstName').isString().withMessage('First name is required'),
        body('lastName').isString().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
        body('phoneNumber').isString().withMessage('Phone number is required'),
        body('country').isString().withMessage('Country is required'),
        body('city').isString().withMessage('City is required'),
        body('postalCode').isString().withMessage('Postal code is required'),
        body('street').isString().withMessage('Street is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            country,
            city,
            postalCode,
            street,
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            country,
            city,
            postalCode,
            street,
        });
        await user.save();

        const origin = req.headers.origin
        const token = 'abcfaskdnf123'
        const verifyUrl = `${origin}/users/verifyemail?token=${token}&email=${user.email}`;

        await transporter.sendMail({
            from: MAIL_SETTINGS.auth.user,
            to: email,
            subject: 'Welcome! Please verify your email',
            html: `
            <div
              class="container"
              style="max-width: 90%; margin: auto; padding-top: 20px"
            >
              <h2>Welcome to the club.</h2>
              <h4>You are officially In ✔</h4>
              <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
              <p>Please click the below link to verify your email address:</p><p><a href='${verifyUrl}'>Click to verify email</a></p>
         </div>
          `,
        });

        // const userJwt = TokenService.create({
        //     id: user.id,
        //     email: user.email,
        //     role: user.role,
        // });

        // req.session = {
        //     jwt: userJwt,
        // };

        res.status(201).send(user);
    }
);

export { router as signUpRoute };
