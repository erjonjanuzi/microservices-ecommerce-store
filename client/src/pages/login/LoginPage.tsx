import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Divider, Grid, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from './LoginForm';

export default observer(function LoginPage() {

    return (
        <Grid>
            <Grid.Column width={8}>something here</Grid.Column>
            <Grid.Column width={8}>
                <h3
                    style={{
                        textDecoration: 'underline',
                    }}
                >
                    Login with account
                </h3>
                {true ? (
                    <>
                        <LoginForm />
                        <Divider horizontal>or</Divider>
                        <Button
                            basic
                            content="Create account"
                            fluid
                        />
                    </>
                ) : (
                    <h1>register</h1>
                )}
            </Grid.Column>
        </Grid>
    );
});
