import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@labcourseapp/common';
import { addToCartRoute } from './routes/addToCart';
import { getCartRoute } from './routes/getMyCart';
import { removeFromCartRoute } from './routes/removeFromCart';
import { updateCartItemQuantityRoute } from './routes/updateCartItemQuantity';
import { clearCartRoute } from './routes/clearCart';
import { addtoWishlistRoute } from './routes/addToWishlist';
import { getwishlistRoute } from './routes/getMyWishlist';
import { clearWishlistRoute } from './routes/clearWishlist';
import { removeFromWishlistRoute } from './routes/removeFromWishlist';

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

app.use(clearWishlistRoute);
app.use(addtoWishlistRoute);
app.use(getwishlistRoute);
app.use(removeFromWishlistRoute);

app.use(clearCartRoute);
app.use(addToCartRoute);
app.use(getCartRoute);
app.use(removeFromCartRoute);
app.use(updateCartItemQuantityRoute);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
