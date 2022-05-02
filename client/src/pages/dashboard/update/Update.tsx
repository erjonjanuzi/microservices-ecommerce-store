import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import { history } from '../../..';
import { useStore } from '../../../app/stores/store';
import UpdatePassword from './UpdatePassword';

export default observer(function Update() {
    const { userStore } = useStore();
    const [passwordUpdated, setPasswordUpdated] = useState(false);

    useEffect(() => {
        if (!userStore.user.firstTimeAccess) {
            history.push('/dashboard/overview?loginSuccessful')
        }
    }, [passwordUpdated]);

    return (
        <div
            style={{
                minWidth: '100vw',
                minHeight: '100vh',
                backgroundColor: '#121317',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Segment style={{ backgroundColor: '#1a1c23', color: '#cfcfcf', padding: '50px' }}>
                <h2>Welcome, {userStore.user.firstName}</h2>
                <h2>Please update your password for security reasons</h2>
                <br />
                <UpdatePassword setPasswordUpdated={setPasswordUpdated} />
            </Segment>
        </div>
    );
});
