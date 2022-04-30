import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import {
    faBars,
    faBox,
    faBorderAll,
    faTruckLoading,
    faGift,
    faUserTie,
    faCog,
    faUserTag,
} from '@fortawesome/free-solid-svg-icons';

export default observer(function Sidebar() {
    const {
        userStore: { logout },
    } = useStore();

    return (
        <Menu
            vertical
            fluid
            fixed="left"
            style={{ maxWidth: '20vw', marginTop: '60px' }}
            borderless
        >
            <Menu.Item as={NavLink} to={'/dashboard/overview'} exact activeClassName="active">
                <FontAwesomeIcon icon={faBorderAll} size="lg" />
                <span style={{ marginLeft: '15px' }}>Dashboard</span>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/dashboard/products'} exact activeClassName="active">
                <FontAwesomeIcon icon={faBox} size="lg" />
                <span style={{ marginLeft: '15px' }}>Products</span>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/dashboard/categories'} exact activeClassName="active">
                <FontAwesomeIcon icon={faBars} size="lg" />
                <span style={{ marginLeft: '15px' }}>Categories</span>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/dashboard/customers'} exact activeClassName="active">
                <FontAwesomeIcon icon={faUserTag} size="lg" />
                <span style={{ marginLeft: '15px' }}>Customers</span>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/dashboard/orders'} exact activeClassName="active">
                <FontAwesomeIcon icon={faTruckLoading} size="lg" />
                <span style={{ marginLeft: '15px' }}>Orders</span>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/dashboard/coupons'} exact activeClassName="active">
                <FontAwesomeIcon icon={faGift} size="lg" />
                <span style={{ marginLeft: '15px' }}>Coupons</span>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/dashboard/staff'} exact activeClassName="active">
                <FontAwesomeIcon icon={faUserTie} size="lg" />
                <span style={{ marginLeft: '15px' }}>Our Staff</span>
            </Menu.Item>
            <Menu.Item as={NavLink} to={'/dashboard/settings'} exact activeClassName="active">
                <FontAwesomeIcon icon={faCog} size="lg" />
                <span style={{ marginLeft: '15px' }}>Settings</span>
            </Menu.Item>

            <div className="sidebar-button">
                <Button content="Logout" icon="power" positive onClick={logout} />
            </div>
        </Menu>
    );
});
