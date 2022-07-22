import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Label, Loader, Table } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { useStore } from "../../app/stores/store";
import OrderDetails from "./OrderDetails";

const status = {
    'awaiting:delivery': 'Awaiting Delivery',
    'intransit': 'In Transit',
    'delivered': 'Delivered'
}

export default observer(function MyOrders() {
    const { userStore, drawerStore } = useStore();
    const [orders, setOrders] = useState<any[]>();

    useEffect(() => {
        if (userStore.user) {
            // @ts-ignore
            agent.Orders.getMyOrders().then((orders: any[]) => {
                setOrders(orders);
            });
        }
    }, [])

    if (!orders) return <div style={{ minHeight: '100vh', marginTop: '50px' }}>
        <Loader active /></div>

    return (
        <>
            
            <h1>My Orders</h1>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Order No.</Table.HeaderCell>
                        <Table.HeaderCell>Order Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {/* @ts-ignore */}
                    {orders?.map(order => {
                        return <Table.Row>
                            <Table.Cell selectable>
                                <a href="#">#{order.orderNo}</a>
                            </Table.Cell>
                            <Table.Cell>
                                {(new Date(order.createdAt)).toLocaleDateString('en-US')}
                            </Table.Cell>
                            <Table.Cell>
                                {/* @ts-ignore */}
                                <Label basic color="green">{status[order.status]}</Label>
                            </Table.Cell>
                            <Table.Cell>{order.totalPrice.toFixed(2)} EUR</Table.Cell>
                            <Table.Cell><Button icon='eye' basic size="big" 
                            onClick={() => drawerStore.openDrawer(<OrderDetails order={order} />, `Order #${order.orderNo} details`, 'white')} /></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </>
    )
})