import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@labcourseapp/common';
import { createProductRoute } from './routes/createProduct';
import { editProductRoute } from './routes/editProduct';
import { getProductRoute } from './routes/getProduct';
import { getInventoryRoute } from './routes/getInventory';
import { deleteProductRoute } from './routes/deleteProduct';
import { getProductsRoute } from './routes/getProducts';
import { addReviewRoute } from './routes/addReview';
import { deleteReviewRoute } from './routes/deleteReview';
import { getManufacturersByCategory } from './routes/getCategoryManufacturers';
import { getSimilarProducts } from './routes/getSimilarProducts';
import { editCategoryRoute } from './routes/editCategory';
import { getCategoriesRoute } from './routes/getCategories';
import { getCategoryRoute } from './routes/getCategory';
import { deleteCategoryRoute } from './routes/deleteCategory';
import { addCategoryRoute } from './routes/addCategory';
import { promoteProductRoute } from './routes/promoteProduct';
import { getPromotedProducts } from './routes/getPromotedProducts';
import { getProductsByRating } from './routes/getProductsByRating';
import { getProductsOnSale } from './routes/getProductsOnSale';
import { getNumberOfProducts } from './routes/getNumberOfProducts';

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

app.use(editProductRoute);
app.use(getPromotedProducts);
app.use(getProductsByRating);
app.use(getProductsOnSale);
app.use(getNumberOfProducts);
app.use(promoteProductRoute);

app.use(addReviewRoute);
app.use(deleteReviewRoute);

app.use(getProductsRoute);
app.use(getInventoryRoute);
app.use(createProductRoute);

app.use(getProductRoute);
app.use(getManufacturersByCategory);
app.use(getSimilarProducts);
app.use(deleteProductRoute);

app.use(editCategoryRoute);
app.use(getCategoriesRoute);
app.use(getCategoryRoute);
app.use(deleteCategoryRoute);
app.use(addCategoryRoute);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
