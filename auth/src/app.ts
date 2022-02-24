import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@labcourseapp/common';
import { checkUserRoute } from './routes/checkUser';
import { currentUserRoute } from './routes/currentUser';
import { signInRoute } from './routes/signin';
import { signOutRoute } from './routes/signout';
import { signUpRoute } from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        // secure: process.env.NODE_ENV !== 'test',
        secure: false,
    })
);

app.use(currentUserRoute);
app.use(signInRoute);
app.use(signOutRoute);
app.use(signUpRoute);
app.use(checkUserRoute);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
