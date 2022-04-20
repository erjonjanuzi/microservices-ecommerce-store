import { observer } from 'mobx-react-lite';
import { Button, Divider, Search, Segment } from 'semantic-ui-react';
import StaffTable from './StaffTable';
import { useState } from 'react';
import { Drawer } from '@mui/material';

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
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} anchor="right">
                <div className="row-flex">
                    <h1>Add staff</h1>
                    <Button
                        icon="close"
                        color="red"
                        secondary
                        onClick={() => setOpenDrawer(false)}
                    />
                </div>
                <Divider />
                <div className="scrollable">
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                </div>
                <Divider />
                <div className='row-flex'>
                    <Button content='Confirm' fluid positive/>
                    <Button content='Cancel' fluid basic/>
                </div>
            </Drawer>
            {/* <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Drawer.Header>
                    <Drawer.Title>Drawer Title</Drawer.Title>
                    <Drawer.Actions>
                        <Button onClick={() => setOpenDrawer(false)}>Cancel</Button>
                        <Button appearance="primary">
                            Confirm
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body>
                    <h1>test</h1>
                </Drawer.Body>
            </Drawer> */}
        </>
    );
});
