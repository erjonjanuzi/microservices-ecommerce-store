import { observer } from 'mobx-react-lite';
import { Button, Divider, Grid } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import EditPersonalInformationForm from './EditPersonalInformationForm';
import UpdateAddress from './UpdateAddress';
import UpdatePassword from './UpdatePassword';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddDeliveryAddress from './AddDeliveryAddress';
import UpdateDeliveryAddress from './UpdateDeliveryAddress';

export default observer(function PersonalDetails() {
    const {
        userStore: { user, deleteAccount },
        drawerStore,
        confirmStore,
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
                <h3>
                    <FontAwesomeIcon icon={faTruck} />
                    Preferred delivery address
                </h3>
                {user.deliveryAddress ?
                    <>
                        <p>{user.deliveryAddress.country}</p>
                        <p>{`${user.deliveryAddress.city}, ${user.deliveryAddress.postCode}`}</p>
                        <p>{user.deliveryAddress.street}</p>
                        <Button
                            content="Update delivery address"
                            size="small"
                            basic
                            onClick={() =>
                                drawerStore.openDrawer(
                                    <UpdateDeliveryAddress />,
                                    'Update delivery address',
                                    'white'
                                )
                            }
                        />
                    </> : (
                        <a
                            href=""
                            onClick={(e: any) => {
                                e.preventDefault();
                                drawerStore.openDrawer(
                                    <AddDeliveryAddress />,
                                    'Add delivery address information',
                                    'white'
                                )
                            }}
                        >
                            Add delivery address
                        </a>
                    )}
                <Divider />
                <Button
                    negative
                    icon="trash outline"
                    content="Delete account"
                    size="small"
                    style={{ margin: '10px 0 5px 0' }}
                    onClick={() => confirmStore.openConfirm(
                        'Delete account',
                        'Are you sure you want to PERMANENTLY delete your account? Once this is done you can no longer undo this action!',
                        deleteAccount
                    )}
                />
                <p>
                    Permanently delete your account in case you no longer want to use it. <br />
                    Beware that this action is irreversible
                </p>
            </Grid.Column>
        </Grid>
    );
});
