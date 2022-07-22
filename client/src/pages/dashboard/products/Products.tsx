import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Grid, Search, SearchProps, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import AddProductForm from './AddProductForm';
import InventoryProductSorter from './InventoryProductSorter';
import ProductsTable from './ProductsTable';

export default observer(function Products() {
    const { drawerStore, inventoryStore } = useStore();
    const [searchString, setSearchString] = useState('');

    const handleSearchChange = (
        _: React.MouseEvent<HTMLElement, MouseEvent>,
        data: SearchProps
    ) => {
        setSearchString(data.value!);
    };

    const handleSearchSubmit = () => {
        setSearchString('');
        inventoryStore.setSearchString(searchString);
        inventoryStore.loadProducts();
    };

    useEffect(() => { }, [handleSearchSubmit]);


    return (
        <>
            <h1>Products</h1>
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
                                        placeholder="Search products or categories"
                                        showNoResults={false}
                                        fluid
                                        className="dark-button"
                                    />
                                </Form>
                            )}
                        </Formik>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button
                            positive
                            icon="plus"
                            content="New product"
                            onClick={() =>
                                drawerStore.openDrawer(<AddProductForm />, 'Add product')
                            }
                            fluid
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
            <div style={{ float: 'right', marginBottom: '20px' }}>{inventoryStore.products.length > 0 && <InventoryProductSorter />}</div>
            <ProductsTable />
        </>
    );
});
