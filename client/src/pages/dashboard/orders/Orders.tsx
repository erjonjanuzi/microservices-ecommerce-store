import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Grid, Search, SearchProps, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import OrderSorter from './OrderSorter';
import OrdersTable from './OrdersTable';
import OrderStatusDropdown from './OrderStatusDropdown';

export default observer(function Orders() {
    const { drawerStore, orderStore } = useStore();
    const [searchString, setSearchString] = useState('');

    const handleSearchChange = (
        _: React.MouseEvent<HTMLElement, MouseEvent>,
        data: SearchProps
    ) => {
        setSearchString(data.value!);
    };

    const handleSearchSubmit = () => {
        setSearchString('');
        orderStore.setSearchString(searchString);
        orderStore.loadOrders();
    };

    useEffect(() => { }, [handleSearchSubmit]);

    return (
        <>
            <h1>Orders</h1>
            <Segment style={{ backgroundColor: '#1a1c23' }}>
                <Grid>
                    <Grid.Column width={10}>
                        <Formik
                            initialValues={{ searchString: '', error: null }}
                            onSubmit={handleSearchSubmit}
                        >
                            {({ handleSubmit }) => (
                                <Form
                                    className="ui form"
                                    onSubmit={handleSubmit}
                                    autoComplete="off"
                                    style={{ minWidth: '100%' }}
                                >
                                    <Search
                                        onSearchChange={handleSearchChange}
                                        value={searchString}
                                        placeholder="Search orders by customer name, last name or email"
                                        showNoResults={false}
                                        fluid
                                        className="dark-button"
                                    />
                                </Form>
                            )}
                        </Formik>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <OrderStatusDropdown />
                    </Grid.Column>
                </Grid>
            </Segment>
            <div style={{ float: 'right', marginBottom: '20px' }}>{orderStore.orders.length > 0 && <OrderSorter />}</div>
            <OrdersTable />
        </>
    );
});
