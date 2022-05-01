import { observer } from 'mobx-react-lite';
import { Button, Grid, Icon, Search, SearchProps, Segment } from 'semantic-ui-react';
import StaffTable from './StaffTable';
import AddStaffForm from './AddStaffForm';
import { useStore } from '../../../app/stores/store';
import { Form, Formik } from 'formik';
import StaffSorter from './StaffSorter';
import { useEffect, useState } from 'react';

export default observer(function Staff() {
    const { drawerStore, staffStore } = useStore();
    const [searchString, setSearchString] = useState('');

    const handleSearchChange = (
        _: React.MouseEvent<HTMLElement, MouseEvent>,
        data: SearchProps
    ) => {
        setSearchString(data.value!);
    };

    const handleSearchSubmit = () => {
        setSearchString('');
        staffStore.setSearchString(searchString);
        staffStore.loadAllStaff();
    };

    useEffect(() => {}, [handleSearchSubmit]);

    return (
        <>
            <h1>All staff</h1>
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
                                        placeholder="Search staff by name"
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
                            content="New staff"
                            onClick={() => drawerStore.openDrawer(<AddStaffForm />)}
                            fluid
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
            <div style={{ float: 'right', marginBottom: '20px' }}>{staffStore.staff.length > 0 && <StaffSorter />}</div>
            <StaffTable />
        </>
    );
});
