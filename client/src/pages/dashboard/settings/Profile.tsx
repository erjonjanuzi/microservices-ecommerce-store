import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Divider, Grid, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ChangePassword from './ChangePassword';
import EditPersonalDetailsForm from './EditPersonalDetailsForm';

export default observer(function Profile() {
    const {
        userStore: { user },
        drawerStore,
    } = useStore();

    return (
        <>
            <h1>Settings</h1>
            <Segment style={{ backgroundColor: '#1a1c23' }}>
                <Grid>
                    <Grid.Column width={4} textAlign="center">
                        <Label
                            circular
                            content={user.firstName[0] + user.lastName[0]}
                            size="massive"
                            style={{
                                minWidth: '3em',
                                minHeight: '3em',
                                padding: '1.5em !important',
                                fontSize: '2rem',
                            }}
                            color="purple"
                        />
                        <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <h2>Your account</h2>
                        <h3>Personal details</h3>
                        <h4>First name</h4>
                        <p>{user.firstName}</p>
                        <h4>Last name</h4>
                        <p>{user.lastName}</p>
                        <Button
                            content="Edit personal information"
                            size="small"
                            onClick={() => drawerStore.openDrawer(<EditPersonalDetailsForm />)}
                        />
                        <Divider />
                        <h3>Login details</h3>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                        <h4>Password</h4>
                        <p>*************</p>
                        <a
                            href=""
                            onClick={(e: any) => {
                                e.preventDefault();
                                drawerStore.openDrawer(<ChangePassword />);
                            }}
                        >
                            Change password
                        </a>
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    );
});
