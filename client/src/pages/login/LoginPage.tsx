import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Divider, Grid, Image } from 'semantic-ui-react';
import { history } from '../..';
import { useStore } from '../../app/stores/store';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default observer(function LoginPage() {
    const {
        userStore: { isLoggedIn },
    } = useStore();

    if (isLoggedIn) {
        history.push('/');
    }
    const location = useLocation();

    const [loginTab, setLoginTab] = useState(
        location.hash.split('=')[1] === 'login'
    );

    useEffect(() => {
        setLoginTab(location.hash.split('=')[1] === 'login');
    });

    return (
        <Grid>
            <Grid.Column width={9}>
                <Image src='/assets/undraw_secure_login.svg' />
            </Grid.Column>
            <Grid.Column width={7}>
                <h3>
                    {loginTab ? 'Login with account' : 'Create account'}
                </h3>
                {loginTab ? (
                    <>
                        <LoginForm />
                        <Divider horizontal>or</Divider>
                        <Button
                            basic
                            content="Create account"
                            fluid
                            onClick={() => history.push('/login#tab=register')}
                        />
                    </>
                ) : (
                    <RegisterForm />
                )}
            </Grid.Column>
        </Grid>
    );
});
