import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@labcourseapp/common';
import { addToCartRoute } from './routes/addToCart';
import { getCartRoute } from './routes/getCart';
import { productsTestRoute } from './routes/productsOnCartDb';
import { removeFromCartRoute } from './routes/removeFromCart';

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

app.use(productsTestRoute);
app.use(addToCartRoute);
app.use(getCartRoute);
app.use(removeFromCartRoute);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
