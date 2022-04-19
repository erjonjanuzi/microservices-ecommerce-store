import { observer } from 'mobx-react-lite';
import { Button, Search, Segment } from 'semantic-ui-react';
import StaffTable from './StaffTable';
import { useState } from 'react';
import { Drawer } from 'rsuite';

export default observer(function Staff() {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <h1>All staff</h1>
            <Segment style={{ backgroundColor: '#1a1c23', display: 'flex', flexDirection: 'row' }}>
                <Search />
                <Button
                    positive
                    icon="plus"
                    content="Add new staff"
                    onClick={() => setOpenDrawer(true)}
                />
            </Segment>
            <StaffTable />
            <Drawer open={openDrawer} backdrop={true}>
                <Drawer.Body>
                    <h1>drawer opened</h1>
                </Drawer.Body>
            </Drawer>
        </>
    );
});
