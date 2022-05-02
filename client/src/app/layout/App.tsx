import { useEffect } from 'react';
// import 'rsuite/dist/rsuite.min.css';
import './style.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useStore } from '../stores/store';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute';
import { observer } from 'mobx-react-lite';
import ServerError from '../../pages/errors/ServerError';
import NotFound from '../../pages/errors/NotFoundError';
import HomePage from '../../pages/home/HomePage';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import CartPage from '../../pages/cart/CartPage';
import WishlistPage from '../../pages/wishlist/WishlistPage';
import Products from '../../pages/products/Products';
import LoginPage from '../../pages/login/LoginPage';
import ProductPage from '../../pages/products/ProductPage';
import Main from '../../pages/dashboard/layout/Main';
import DrawerContainer from '../common/drawer/DrawerContainer';
import ConfirmContainer from '../common/confirm/ConfirmContainer';
import ModalContainer from '../common/modal/ModalContainer';
import Update from '../../pages/dashboard/update/Update';
import OneTimeRoute from './OneTimeRoute';

function App() {
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        userStore.getUser().finally(() => commonStore.setAppLoaded());
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded) return <LoadingComponent content="Loading app..." />;

    return (
        <>
            <ToastContainer position="top-right" hideProgressBar />
            <ModalContainer />
            <DrawerContainer />
            <ConfirmContainer />
            <Switch>
                <OneTimeRoute exact path="/updatepassword" component={Update} />
                {userStore.user?.role === 'admin' ? (
                    <Main />
                ) : (
                    <>
                        <NavBar />
                        <Container>
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/products" component={Products} />
                                <Route exact path="/products/:id" component={ProductPage} />
                                <Route exact path="/cart" component={CartPage} />
                                <Route exact path="/wishlist" component={WishlistPage} />
                                <Route exact path="/login" component={LoginPage} />

                                <Route exact path="/server-error" component={ServerError} />
                                <Route component={NotFound} />
                            </Switch>
                        </Container>
                    </>
                )}
            </Switch>
        </>
    );
}

export default observer(App);
