import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {
    Button,
    Header,
    Icon,
    Loader,
    Pagination,
    PaginationProps,
    Segment,
    Table,
} from 'semantic-ui-react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import AddStaffForm from './AddStaffForm';
import EditStaffForm from './EditStaffForm';

export default observer(function StaffTable() {
    const {
        drawerStore,
        staffStore: {
            loadAllStaff,
            setPagingParams,
            deleteStaff,
            staffRegistry,
            staff,
            pagination,
            loadingInitial,
            searchString,
            setSearchString,
        },
        confirmStore,
    } = useStore();

    const onChange = (_: React.MouseEvent<HTMLAnchorElement>, pageInfo: PaginationProps) => {
        if (typeof pageInfo.activePage === 'string') return;

        setPagingParams(new PagingParams(pageInfo.activePage));
        loadAllStaff();
    };

    useEffect(() => {
        loadAllStaff().then(() => setSearchString(''));
    }, [staffRegistry]);

    if (loadingInitial || !pagination) return <Loader active />;

    if (staff.length === 0) {
        if (searchString !== '') {
            return <h1>{`No results found for "${searchString}"`}</h1>;
        } else {
            return (
                <Segment placeholder inverted style={{backgroundColor: '#1a1c23'}}>
                    <Header icon>
                        <Icon name="close" />
                        No staff members registered yet.
                    </Header>
                    <Button primary onClick={() => drawerStore.openDrawer(<AddStaffForm />, 'Add staff')}>Add staff</Button>
                </Segment>
            );
        }
    }

    return (
        <>
            {searchString !== '' && <h1>{`Search results for "${searchString}"`}</h1>}
            <Table style={{ backgroundColor: '#1a1c23' }} inverted singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Joining date</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {staff.map((staff) => (
                        <Table.Row key={staff.id}>
                            <Table.Cell>{staff.firstName + ' ' + staff.lastName}</Table.Cell>
                            <Table.Cell>{staff.email}</Table.Cell>
                            <Table.Cell>{new Date(staff.createdAt).toDateString()}</Table.Cell>
                            <Table.Cell>{staff.role}</Table.Cell>
                            <Table.Cell textAlign="right">
                                <Button.Group>
                                    <Button
                                        icon="edit outline"
                                        onClick={() =>
                                            drawerStore.openDrawer(<EditStaffForm id={staff.id} />, 'Edit staff')
                                        }
                                        content="Edit"
                                    />
                                    <Button
                                        icon="trash alternate outline"
                                        color="red"
                                        onClick={() =>
                                            confirmStore.openConfirm(
                                                'This action is irreversible',
                                                'Are you sure you want to delete this user?',
                                                deleteStaff,
                                                staff.id
                                            )
                                        }
                                    />
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="2" textAlign="left">
                            <p>{`Showing ${
                                pagination.currentPage * pagination.itemsPerPage -
                                pagination.itemsPerPage +
                                1
                            }-${
                                pagination.currentPage * pagination.itemsPerPage <
                                pagination.totalItems
                                    ? pagination.currentPage * pagination.itemsPerPage
                                    : pagination.currentPage * pagination.itemsPerPage -
                                      (pagination.currentPage * pagination.itemsPerPage -
                                          pagination.totalItems)
                            } of ${pagination.totalItems}`}</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan="3" textAlign="right">
                            <Pagination
                                totalPages={pagination.totalPages}
                                onPageChange={onChange}
                                activePage={pagination.currentPage}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                size='mini'
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </>
    );
});
