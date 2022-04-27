import { observer } from 'mobx-react-lite';
import { Button, Search, Segment } from 'semantic-ui-react';
import StaffTable from './StaffTable';
import AddStaffForm from './AddStaffForm';
import { useStore } from '../../../app/stores/store';

export default observer(function Staff() {
    const { drawerStore } = useStore();

    return (
        <>
            <h1>All staff</h1>
            <Segment style={{ backgroundColor: '#1a1c23', display: 'flex', flexDirection: 'row' }}>
                <Search />
                <Button
                    positive
                    icon="plus"
                    content="Add new staff"
                    onClick={() => drawerStore.openDrawer(<AddStaffForm />)}
                />
            </Segment>
            <StaffTable />
        </>
    );
});
