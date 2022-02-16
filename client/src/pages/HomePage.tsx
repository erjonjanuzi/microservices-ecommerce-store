import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStore } from '../app/stores/store';
import LoginForm from './login/LoginForm';

export default observer(function HomePage() {
    return (
        <>
            <h1>Homepage</h1>
        </>
    );
});
