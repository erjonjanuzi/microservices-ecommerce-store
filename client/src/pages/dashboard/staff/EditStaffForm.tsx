import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Button, Divider, Loader } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import ValidationErrors from '../../login/ValidationErrors';
import * as Yup from 'yup';

interface Props {
    id: string;
}

export default observer(function EditStaffForm({ id }: Props) {
    const { staffStore, drawerStore } = useStore();

    useEffect(() => {
        if (id) staffStore.getStaffById(id);
        return () => staffStore.clearSelectedStaff();
    }, [staffStore.getStaffById]);

    if (!staffStore.selectedStaff) return <Loader active />;

    const editStaffValidationSchema = Yup.object({
        firstName: Yup.string().required('Please fill out this field'),
        lastName: Yup.string().required('Please fill out this field'),
        email: Yup.string().email('Email must be valid').required('Please fill out this field'),
    });

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
            validationSchema={editStaffValidationSchema}
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
                        <Button
                            loading={isSubmitting}
                            positive
                            type="submit"
                            fluid
                            content="Update"
                            disabled={!dirty || !isValid}
                        />
                        <Button
                            content="Cancel"
                            fluid
                            basic
                            onClick={() => drawerStore.closeDrawer()}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
});
