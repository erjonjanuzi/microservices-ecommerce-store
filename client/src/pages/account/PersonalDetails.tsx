import { observer } from 'mobx-react-lite';
import { Button, Divider, Grid } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import EditPersonalInformationForm from './EditPersonalInformationForm';
import UpdateAddress from './UpdateAddress';
import UpdatePassword from './UpdatePassword';

export default observer(function PersonalDetails() {
    const {
        userStore: { user },
        drawerStore,
    } = useStore();

    return (
        <Grid>
            <Grid.Column width={9}>
                <h1>Your account</h1>
                <h2>Personal information</h2>
                <h3>First name</h3>
                <p>{user.firstName}</p>
                <h3>Last name</h3>
                <p>{user.lastName}</p>
                <h3>Phone number</h3>
                <p>{user.personalDetails.phoneNumber}</p>
                <Button
                    content="Edit personal information"
                    size="small"
                    basic
                    onClick={() =>
                        drawerStore.openDrawer(
                            <EditPersonalInformationForm />,
                            'Edit personal information',
                            'white'
                        )
                    }
                />
                <Divider />
                <h2>Login details</h2>
                <h3>Email</h3>
                <p>{user.email}</p>
                {!user.emailConfirmed && (
                    <Button content="Verify email address" primary size="small" />
                )}
                <h3>Password</h3>
                <p>*************</p>
                <a
                    href=""
                    onClick={(e: any) => {
                        e.preventDefault();
                        drawerStore.openDrawer(<UpdatePassword />, 'Update password', 'white');
                    }}
                >
                    Change password
                </a>
                <Divider />
                <h2>Saved addresses</h2>
                <h3>Account address</h3>
                <p>{user.address.country}</p>
                <p>{`${user.address.city}, ${user.address.postalCode}`}</p>
                <p>{user.address.street}</p>
                <Button
                    content="Update account address"
                    size="small"
                    basic
                    onClick={() =>
                        drawerStore.openDrawer(
                            <UpdateAddress />,
                            'Update address information',
                            'white'
                        )
                    }
                />
            </Grid.Column>
        </Grid>
    );
});
