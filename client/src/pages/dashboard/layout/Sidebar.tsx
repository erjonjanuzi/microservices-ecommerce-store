import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function Sidebar() {
    const { userStore: { logout } } = useStore();

    return (
        <Menu vertical fluid secondary>
            <Menu.Item name="gamepad">Games</Menu.Item>

            <Menu.Item name="gamepad">Games</Menu.Item>

            <Menu.Item name="gamepad">Games</Menu.Item>

            <Menu.Item as={Link} content="Logout" onClick={logout} text="Logout" icon="power" />
        </Menu>
    );
});
