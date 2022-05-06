import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@labcourseapp/common';

import { allUsersRoute } from './routes/getAllUsers';
import { getUserByIdRoute } from './routes/getUserById';
import { currentUserRoute } from './routes/currentUser';
import { signInRoute } from './routes/signin';
import { signOutRoute } from './routes/signout';
import { signUpRoute } from './routes/register';
import { createAdminRoute } from './routes/createAdmin';
import { verifyEmail } from './routes/verifyEmail';
import { changePasswordRoute } from './routes/changePassword';
import { allStaffRoute } from './routes/getAllStaff';
import { updateAdminRoute } from './routes/updateAdmin';
import { deleteUserRoute } from './routes/deleteUser';
import { allCustomersRoute } from './routes/getAllCustomers';
import { checkUserRoute } from './routes/checkUser';
import { updateCustomerRoute } from './routes/updateCustomer';
import { deleteAccountRoute } from './routes/deleteAccount';
import { forgotPasswordRoute } from './routes/forgotPassword';
import { resetPasswordRoute } from './routes/resetPassword';

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
app.use(currentUser);

app.use(resetPasswordRoute)
app.use(forgotPasswordRoute)
app.use(deleteAccountRoute)
app.use(updateCustomerRoute);
app.use(changePasswordRoute);
app.use(checkUserRoute);
app.use(updateAdminRoute);
app.use(currentUserRoute);
app.use(allStaffRoute);
app.use(allCustomersRoute);
app.use(signInRoute);
app.use(verifyEmail);
app.use(signOutRoute);
app.use(signUpRoute);
app.use(createAdminRoute);
app.use(allUsersRoute);
app.use(getUserByIdRoute);
app.use(deleteUserRoute);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
