import { observer } from 'mobx-react-lite';
import { Button, Search, SearchProps, Segment } from 'semantic-ui-react';
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
            <Segment style={{ backgroundColor: '#1a1c23', display: 'flex', flexDirection: 'row' }}>
                <Formik
                    initialValues={{ searchString: '', error: null }}
                    onSubmit={handleSearchSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                            <Search onSearchChange={handleSearchChange} value={searchString} />
                        </Form>
                    )}
                </Formik>

                <Button
                    positive
                    icon="plus"
                    content="Add new staff"
                    onClick={() => drawerStore.openDrawer(<AddStaffForm />)}
                />
            </Segment>
            <StaffSorter />
            <StaffTable />
        </>
    );
});
