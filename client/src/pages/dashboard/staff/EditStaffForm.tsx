import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Divider } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ValidationErrors from '../../login/ValidationErrors';

interface Props {
    id: string;
}

export default observer(function EditStaffForm({id}: Props) {
    const { staffStore } = useStore();

    useEffect(() => {
        if (id) staffStore.getStaffById(id);
        return () => staffStore.clearSelectedStaff();
    }, [staffStore.getStaffById]);

    if (!staffStore.selectedStaff) return <LoadingComponent content="Loading app..." />;

    return (
        <Formik
            initialValues={{
                firstName: staffStore.selectedStaff.firstName,
                lastName: staffStore.selectedStaff.lastName,
                email: staffStore.selectedStaff.email,
                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                staffStore.updateStaff(id, values).catch((error) => {
                    setErrors({ error });
                })
            }
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="firstName" placeholder="John" label="First name" required />
                    <MyTextInput
                        name="lastName"
                        placeholder="Applesed"
                        label="Last name"
                        required
                    />
                    <MyTextInput
                        name="email"
                        placeholder="john@applesed.com"
                        label="Email"
                        type="email"
                        required
                    />
                    <Divider />
                    <ErrorMessage
                        name="error"
                        render={() => <ValidationErrors errors={errors.error} />}
                    />
                    <div className="row-flex">
                        <Button content="Confirm" fluid positive />
                        <Button content="Cancel" fluid basic />
                    </div>
                </Form>
            )}
        </Formik>
    );
});
