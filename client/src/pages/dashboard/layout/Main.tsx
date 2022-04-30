import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { Container, Dropdown, Label } from 'semantic-ui-react';
import Dashboard from '../dashboardoverview/Dashboard';
import Staff from '../staff/Staff';
import Sidebar from './Sidebar';

export default observer(function Main() {
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
                    <h1>Zebra51</h1>
                </div>
                <div>
                    <Label circular content="EJ" size="big"  style={{marginRight: '10px'}}/>
                    <Dropdown pointing="top right" text='Erjon Januzi'>
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
                        <Route exact path="/dashboard/overview" component={Dashboard} />
                        <Route exact path="/dashboard/staff" component={Staff} />
                    </Switch>
                </Container>
            </div>
        </>
    );
});
