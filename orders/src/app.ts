import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@labcourseapp/common';
import { createOrderRoute } from './routes/createOrder';
import { getOrders } from './routes/getOrders';
import { getOrder } from './routes/getOrder';
import { getMyOrders } from './routes/getMyOrders';
import { updateOrderStatus } from './routes/updateOrderStatus';
import { getOrdersByStatus } from './routes/getOrdersByStatus';
import { getNumberOfOrders } from './routes/getNumberOfOrders';
import { getRevenue } from './routes/getTotalOrderRev';
import { getNumberOfAwaitingOrders } from './routes/getNumberOfAwaitingOrders';

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

app.use(getNumberOfAwaitingOrders);
app.use(getRevenue);
app.use(getNumberOfOrders)
app.use(getMyOrders)
app.use(getOrdersByStatus)
app.use(updateOrderStatus)
app.use(getOrders)
app.use(getOrder)
app.use(createOrderRoute)

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
