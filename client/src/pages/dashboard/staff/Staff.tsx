import { observer } from 'mobx-react-lite';
import { Button, Pagination, PaginationProps, Search, Segment } from 'semantic-ui-react';
import StaffTable from './StaffTable';
import { useEffect, useState } from 'react';
import AddStaffForm from './AddStaffForm';
import { useStore } from '../../../app/stores/store';
import { PagingParams } from '../../../app/models/pagination';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function Staff() {
    const {
        staffStore: { staffRegistry, loadAllStaff, staff, setPagingParams, pagination },
        drawerStore,
    } = useStore();
    const [loadingNext, setLoadingNext] = useState(false);
    const [activePage, setActivePage] = useState<any>(1);

    function handleGetNext() {
        setLoadingNext(true);
        // @ts-ignore
        setPagingParams(new PagingParams(parseInt(pagination!.currentPage) + 1));
        loadAllStaff().then(() => setLoadingNext(false));
    }

    const onChange = (e: React.MouseEvent<HTMLAnchorElement>, pageInfo: PaginationProps) => {
        if (pageInfo.activePage != null) {
            setActivePage(pageInfo.activePage);
        }
        //@ts-ignore
        setPagingParams(new PagingParams(pageInfo.activePage));
        loadAllStaff().then(() => setLoadingNext(false));
    };

    useEffect(() => {
        loadAllStaff();
    }, [staffRegistry, loadAllStaff]);

    if (!pagination) return <LoadingComponent content='loading...' />

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

            <Pagination
                totalPages={pagination!.totalPages}
                onPageChange={onChange}
                activePage={activePage}
                ellipsisItem={null}
            />
        </>
    );
});
