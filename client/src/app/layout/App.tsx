import React, { useEffect } from 'react';
import logo from './logo.svg';
import './style.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useStore } from '../stores/store';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute';
import { observer } from 'mobx-react-lite';
import ServerError from '../../pages/errors/ServerError';
import NotFound from '../../pages/errors/NotFoundError';
import HomePage from '../../pages/HomePage';
import Test from '../../pages/Test';
import LoadingComponent from './LoadingComponent';

function App() {
    const location = useLocation();
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        userStore.getUser().finally(() => commonStore.setAppLoaded());
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

    return (
        <>
            <ToastContainer position="top-right" hideProgressBar />
            <Route exact path="/" component={HomePage} />
            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/testafterlogin"
                                component={Test}
                            />
                            <Route
                                path="/server-error"
                                component={ServerError}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </>
                )}
            />
        </>
    );
}

export default observer(App);
