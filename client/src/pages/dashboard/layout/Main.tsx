import { observer } from 'mobx-react-lite';
import { Switch, useLocation } from 'react-router-dom';
import { Container, Dropdown, Label } from 'semantic-ui-react';
import PrivateRoute from '../../../app/layout/PrivateRoute';
import { useStore } from '../../../app/stores/store';
import Customers from '../customers/Customers';
import Dashboard from '../dashboardoverview/Dashboard';
import Products from '../products/Products';
import Profile from '../settings/Profile';
import Staff from '../staff/Staff';
import Sidebar from './Sidebar';
import WelcomeWindow from './WelcomeWindow';

export default observer(function Main() {
    const {
        userStore: { user },
        modalStore,
    } = useStore();
    const location = useLocation();

    if (location.search.split('?')[1] === 'loginSuccessful'){
        modalStore.openModal(<WelcomeWindow name={user.firstName} />, 'tiny')
    }

    return (
        <>
            <div
                className="navbar"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                }}
            >
                <div>
                    <h1>🛍 Zebra51</h1>
                </div>
                <div>
                    <Label
                        circular
                        content={user.firstName[0] + user.lastName[0]}
                        size="big"
                        style={{ marginRight: '10px' }}
                    />
                    <Dropdown pointing="top right" text={`${user.firstName} ${user.lastName}`}>
                        <Dropdown.Menu>
                            <Dropdown.Item text="Edit Profile" icon="user" />
                            <Dropdown.Item text="Logout" icon="power" />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <Sidebar />
            <div className="myScrollableDiv" style={{ padding: '30px' }}>
                <Container>
                    <Switch>
                        <PrivateRoute exact path="/dashboard/staff" component={Staff} />
                        <PrivateRoute exact path="/dashboard/customers" component={Customers} />
                        <PrivateRoute exact path="/dashboard/settings" component={Profile} />
                        <PrivateRoute exact path='/dashboard/products' component={Products} />
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                    </Switch>
                </Container>
            </div>
        </>
    );
});
