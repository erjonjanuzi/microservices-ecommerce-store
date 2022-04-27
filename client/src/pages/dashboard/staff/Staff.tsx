import { observer } from 'mobx-react-lite';
import { Button, Search, Segment } from 'semantic-ui-react';
import StaffTable from './StaffTable';
import { useEffect, useState } from 'react';
import AddStaffForm from './AddStaffForm';
import { useStore } from '../../../app/stores/store';
import { PagingParams } from '../../../app/models/pagination';

export default observer(function Staff() {
    const {staffStore: {staffRegistry, loadAllStaff, staff, setPagingParams, pagination}, drawerStore} = useStore()
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        // @ts-ignore
        setPagingParams(new PagingParams(parseInt(pagination!.currentPage) + 1))
        loadAllStaff().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        loadAllStaff();
    }, [staffRegistry, loadAllStaff])

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
            <StaffTable staff={staff} next={handleGetNext} />
            {/* <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} anchor="right">
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
                    <AddStaffForm />
                </div>           
            </Drawer> */}
        </>
    );
});
