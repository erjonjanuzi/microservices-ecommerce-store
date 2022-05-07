import { Drawer } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function DrawerContainer() {
    const { drawerStore } = useStore();

    return (
        <Drawer open={drawerStore.drawer.open} onClose={drawerStore.closeDrawer} anchor="right" className={drawerStore.drawer.theme === 'dark' ? 'darkmode-drawer' : 'whitemode-drawer'}>
            <div className="row-flex">
                <h2>{drawerStore.drawer.header}</h2>
                <Button icon="close" basic circular onClick={drawerStore.closeDrawer} size='mini'/>
            </div>
            <Divider />
            <div className="scrollable">{drawerStore.drawer.body}</div>
        </Drawer>
    );
});
