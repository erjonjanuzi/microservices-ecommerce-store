import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@labcourseapp/common';
import { createProductRoute } from './routes/createProduct';
import { editProductRoute } from './routes/editProduct';
import { getProductRoute } from './routes/getProduct';
import { getAllProductsRoute } from './routes/getAllProducts';
import { deleteProductRoute } from './routes/deleteProduct';

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

app.use(createProductRoute);
app.use(editProductRoute);
app.use(getProductRoute);
app.use(getAllProductsRoute);
app.use(deleteProductRoute);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
