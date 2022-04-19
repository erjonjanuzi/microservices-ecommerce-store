import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function Sidebar() {
    const { userStore: { logout } } = useStore();

    return (
        <Menu vertical fluid fixed='left' style={{maxWidth: '20vw', marginTop: '60px'}} borderless>
            <Menu.Item as={NavLink} to={'/dashboard/overview'} content={'Dashboard'} exact activeClassName='active'/>
            <Menu.Item as={NavLink} to={'/dashboard/products'} content={'Products'} exact activeClassName='active' />
            <Menu.Item as={NavLink} to={'/dashboard/categories'} content={'Category'} exact activeClassName='active' />
            <Menu.Item as={NavLink} to={'/dashboard/customers'} content={'Customers'} exact activeClassName='active' />
            <Menu.Item as={NavLink} to={'/dashboard/orders'} content={'Orders'} exact activeClassName='active' />
            <Menu.Item as={NavLink} to={'/dashboard/coupons'} content={'Coupons'} exact activeClassName='active' />
            <Menu.Item as={NavLink} to={'/dashboard/staff'} content={'Our staff'} exact activeClassName='active' />
            <Menu.Item as={NavLink} to={'/dashboard/settings'} content={'Settings'} exact activeClassName='active' />

            <Menu.Item as={Link} content="Logout" onClick={logout} text="Logout" icon="power" />
        </Menu>
    );
});
