import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { Container, Dropdown, Label } from 'semantic-ui-react';
import PrivateRoute from '../../../app/layout/PrivateRoute';
import { useStore } from '../../../app/stores/store';
import Customers from '../customers/Customers';
import Dashboard from '../dashboardoverview/Dashboard';
import Staff from '../staff/Staff';
import Sidebar from './Sidebar';

export default observer(function Main() {
    const { userStore: {user}} = useStore()

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
                    <Label circular content={user.firstName[0] + user.lastName[0]} size="big"  style={{marginRight: '10px'}}/>
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
                        <PrivateRoute exact path="/dashboard/overview" component={Dashboard} />
                        <PrivateRoute exact path="/dashboard/staff" component={Staff} />
                        <PrivateRoute exact path="/dashboard/customers" component={Customers} />
                    </Switch>
                </Container>
            </div>
        </>
    );
});
