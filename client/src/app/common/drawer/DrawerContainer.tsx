import { Drawer } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function DrawerContainer() {
    const { drawerStore } = useStore();

    return (
        <Drawer open={drawerStore.drawer.open} onClose={drawerStore.closeDrawer} anchor="right">
            <div className="row-flex">
                <h1>Add staff</h1>
                <Button icon="close" color="red" secondary onClick={drawerStore.closeDrawer} />
            </div>
            <Divider />
            <div className="scrollable">{drawerStore.drawer.body}</div>
        </Drawer>
    );
});
