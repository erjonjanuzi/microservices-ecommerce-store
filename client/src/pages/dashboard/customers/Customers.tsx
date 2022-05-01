import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Grid, Search, SearchProps, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CustomerSorter from "./CustomerSorter";
import CustomersTable from "./CustomersTable";

export default observer(function Customers() {
    const { customerStore } = useStore();
    const [searchString, setSearchString] = useState('');

    const handleSearchChange = (
        _: React.MouseEvent<HTMLElement, MouseEvent>,
        data: SearchProps
    ) => {
        setSearchString(data.value!);
    };

    const handleSearchSubmit = () => {
        setSearchString('');
        customerStore.setSearchString(searchString);
        customerStore.loadCustomers();
    };

    useEffect(() => {}, [handleSearchSubmit]);

    return (
        <>
            <h1>Customers</h1>
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
                                        placeholder="Search customers by name"
                                        showNoResults={false}
                                        fluid
                                        className="dark-button"
                                    />
                                </Form>
                            )}
                        </Formik>
                    </Grid.Column>
                </Grid>
            </Segment>
            <div style={{ float: 'right', marginBottom: '20px' }}>{customerStore.customers.length > 0 && <CustomerSorter />}</div>
            <CustomersTable />
        </>
    );
});
