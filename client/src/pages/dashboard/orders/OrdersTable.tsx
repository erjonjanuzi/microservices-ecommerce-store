import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    Dropdown,
    Header,
    Icon,
    Loader,
    Pagination,
    PaginationProps,
    Segment,
    Table,
} from 'semantic-ui-react';
import agent from '../../../app/api/agent';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import OrderDetails from '../../account/OrderDetails';

const orderStatusOptions = [
    { key: 1, text: 'In Transit', value: 'intransit' },
    { key: 2, text: 'Delivered', value: 'delivered' },
    { key: 3, text: 'Awaiting Delivery', value: 'awaiting:delivery' },
    { key: 4, text: 'Cancelled', value: 'cancelled' },
];

const statusMap = {
    'awaiting:delivery': 'Awaiting Delivery',
    'intransit': 'In Transit',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
}

export default observer(function OrdersTable() {
    const {
        orderStore: {
            loadOrders,
            setPagingParams,
            orderRegistry,
            orders,
            pagination,
            loadingInitial,
            searchString,
            setSearchString,
            status
        },
        drawerStore
    } = useStore();

    const onChange = (_: React.MouseEvent<HTMLAnchorElement>, pageInfo: PaginationProps) => {
        if (typeof pageInfo.activePage === 'string') return;

        setPagingParams(new PagingParams(pageInfo.activePage));
        loadOrders();
    };

    const handleStatusChange = async (status: any, orderId: string, orderNo: string) => {
        await agent.Orders.updateOrderStatus(orderId, { status })
        // @ts-ignore
        toast.success(`Order #${orderNo} status was updated to ${statusMap[status]}`)
    }

    useEffect(() => {
        loadOrders().then(() => setSearchString(''));
    }, [orderRegistry, status]);

    if (loadingInitial || !pagination) return <Loader active />;

    if (orders.length === 0) {
        if (searchString !== '') {
            return <h1>{`No results found for "${searchString}"`}</h1>;
        } else {
            return (
                <Segment placeholder inverted style={{ backgroundColor: '#1a1c23' }}>
                    <Header icon>
                        <Icon name="close" />
                        No orders placed yet.
                    </Header>
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
                        <Table.HeaderCell>Order No.</Table.HeaderCell>
                        <Table.HeaderCell>Customer</Table.HeaderCell>
                        <Table.HeaderCell>Order Date</Table.HeaderCell>
                        <Table.HeaderCell>Order Price</Table.HeaderCell>
                        <Table.HeaderCell>Order Status</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {orders.map((order) => (
                        <Table.Row key={order.id}>
                            <Table.Cell>#{order.orderNo}</Table.Cell>
                            <Table.Cell>{order.contact.firstName} {order.contact.lastName}</Table.Cell>
                            <Table.Cell>{(new Date(order.createdAt).toLocaleString())}</Table.Cell>
                            <Table.Cell>{`${order.totalPrice.toFixed(2)} €`}</Table.Cell>
                            <Table.Cell>
                                <Dropdown
                                    defaultValue={order.status}
                                    options={orderStatusOptions}
                                    simple
                                    item
                                    onChange={(_, data) => handleStatusChange(data.value, order.id, order.orderNo)}
                                />
                            </Table.Cell>
                            <Table.Cell textAlign="center">
                                <Icon link
                                    onClick={() => drawerStore.openDrawer(<OrderDetails order={order} />,
                                        `Order #${order.orderNo} Details`, 'dark')}
                                    name="eye" />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="3" textAlign="left">
                            <p>{`Showing ${pagination.currentPage * pagination.itemsPerPage -
                                pagination.itemsPerPage +
                                1
                                }-${pagination.currentPage * pagination.itemsPerPage <
                                    pagination.totalItems
                                    ? pagination.currentPage * pagination.itemsPerPage
                                    : pagination.currentPage * pagination.itemsPerPage -
                                    (pagination.currentPage * pagination.itemsPerPage -
                                        pagination.totalItems)
                                } of ${pagination.totalItems}`}</p>
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan="8" textAlign="right">
                            <Pagination
                                totalPages={pagination.totalPages}
                                onPageChange={onChange}
                                activePage={pagination.currentPage}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                                size="mini"
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </>
    );
});
