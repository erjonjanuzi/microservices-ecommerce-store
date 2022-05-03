import { observer } from 'mobx-react-lite';
import { Tab } from 'semantic-ui-react';
import MyOrders from './MyOrders';
import PersonalDetails from './PersonalDetails';

const panes = [
    {
        menuItem: 'Personal details',
        render: () => <Tab.Pane attached={false}><PersonalDetails /></Tab.Pane>,
    },
    {
        menuItem: 'My orders',
        render: () => <Tab.Pane attached={false}><MyOrders /></Tab.Pane>,
    },
];

export default observer(function Account() {
    return (
        <>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </>
    );
});
