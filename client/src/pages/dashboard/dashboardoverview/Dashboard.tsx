import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Dropdown, Grid, Icon, Table } from 'semantic-ui-react';
import { number } from 'yup';
import agent from '../../../app/api/agent';
import { useStore } from '../../../app/stores/store';
import OrderDetails from '../../account/OrderDetails';

const statusMap = {
    'awaiting:delivery': 'Awaiting Delivery',
    'intransit': 'In Transit',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
}

export default observer(function Dashboard() {
    const { drawerStore} = useStore();

    const [numberOfProducts, setNumberOfProducts] = useState(0);
    const [numberOfOrders, setNumberOfOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [numberOfAwaitingOrders, setNumberOfAwaitingOrders] = useState(0);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        agent.Inventory.numberOfProducts().then((result) => {
            // @ts-ignore
            setNumberOfProducts(result);
        });
        agent.Orders.numberOfOrders().then((result) => {
            // @ts-ignore
            setNumberOfOrders(result);
        });
        agent.Orders.totalRevenue().then((result) => {
            // @ts-ignore
            setTotalRevenue(result);
        })
        agent.Orders.numberOfAwaitingOrders().then((result) => {
            // @ts-ignore
            setNumberOfAwaitingOrders(result);
        })
        const params = new URLSearchParams();
        params.append('pageNumber', '1');
        params.append('pageSize', '8');
        agent.Orders.getOrdersByStatus(params, 'awaiting:delivery').then((result) => {
            // @ts-ignore
            setOrders(result.data);
        })
    }, [])

    return (
        <>
            <h1>Dashboard overview</h1>
            <Grid>
                <Grid.Column width={5}>
                    <div style={{ backgroundColor: '#24262d', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p>Orders</p>
                            <p style={{ fontSize: '40pt', fontWeight: 'bolder' }}>{numberOfOrders}</p>
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column width={5}>
                    <div style={{ backgroundColor: '#24262d', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p>Products</p>
                            <p style={{ fontSize: '40pt', fontWeight: 'bolder' }}>{numberOfProducts}</p>
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column width={5}>
                    <div style={{ backgroundColor: '#24262d', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p>Total revenue</p>
                            <p style={{ fontSize: '40pt', fontWeight: 'bolder' }}>{totalRevenue} EUR</p>
                        </div>
                    </div>
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column width={10}>
                    <Table style={{ backgroundColor: '#1a1c23' }} inverted singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Order No.</Table.HeaderCell>
                                <Table.HeaderCell>Customer</Table.HeaderCell>
                                <Table.HeaderCell>Order Date</Table.HeaderCell>
                                <Table.HeaderCell>Order Price</Table.HeaderCell>
                                <Table.HeaderCell>Order Status</Table.HeaderCell>
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
                                        {/* @ts-ignore */}
                                        {statusMap[order.status]}
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
                    </Table>
                </Grid.Column>
                <Grid.Column width={5}>
                    <div style={{ backgroundColor: '#24262d', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p>Pending Orders</p>
                            <p style={{ fontSize: '40pt', fontWeight: 'bolder' }}>{numberOfAwaitingOrders}</p>
                        </div>
                    </div>
                </Grid.Column>
            </Grid>
        </>
    );
});
