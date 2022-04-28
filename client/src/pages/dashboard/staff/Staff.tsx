import { observer } from 'mobx-react-lite';
import { Button, Search, SearchProps, Segment } from 'semantic-ui-react';
import StaffTable from './StaffTable';
import AddStaffForm from './AddStaffForm';
import { useStore } from '../../../app/stores/store';
import { Form, Formik } from 'formik';
import StaffSorter from './StaffSorter';

export default observer(function Staff() {
    const { drawerStore, staffStore } = useStore();

    const handleSearchChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, data: SearchProps) => {
        staffStore.setSearchString(data.value!)
    };

    return (
        <>
            <h1>All staff</h1>
            <Segment style={{ backgroundColor: '#1a1c23', display: 'flex', flexDirection: 'row' }}>
                <Formik
                    initialValues={{ searchString: '', error: null }}
                    onSubmit={(values, { setErrors }) => staffStore.loadAllStaff()}
                >
                    {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                            <Search onSearchChange={handleSearchChange} />
                            <Button
                                content="search"
                                type="submit"
                            />
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
