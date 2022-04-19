import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Dashboard from '../dashboardoverview/Dashboard';
import Staff from '../staff/Staff';
import StaffTable from '../staff/StaffTable';
import Sidebar from './Sidebar';

export default observer(function Main() {
    return <>
        <div
            className="navbar"
            style={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                paddingLeft: '30px',
            }}
        >
            <h1>Ecommerce store name</h1>
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
    </>;
});
