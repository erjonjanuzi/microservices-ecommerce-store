import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../app/stores/store';
import LoginForm from './users/LoginForm';

export default observer(function HomePage() {
    const { userStore } = useStore();

    useEffect(() => {
        userStore.getUser();
    }, [userStore]);

    return (
        <>
            <h1>Login</h1>
            {console.log(userStore.user)}
            {userStore.isLoggedIn ? 'You are logged in' : <LoginForm />}
        </>
    );
});
