import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Divider, Grid, Image, Segment } from 'semantic-ui-react';
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
        <div style={{ minHeight: '100vh', marginTop: '50px' }}>
            <Grid>
                <Grid.Column width={7} textAlign='center'>
                    <Image src='/assets/illustrations/login.svg' />
                </Grid.Column>
                <Grid.Column width={1}>

                </Grid.Column>
                <Grid.Column width={8}>
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
        </div>
    );
});
