import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Icon } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import ValidationErrors from '../../login/ValidationErrors';
import * as Yup from 'yup';

export default observer(function AddStaffForm() {
    const { staffStore, drawerStore } = useStore();

    const addStaffValidationSchema = Yup.object({
        firstName: Yup.string().required('Please fill out this field'),
        lastName: Yup.string().required('Please fill out this field'),
        email: Yup.string().email('Email must be valid').required('Please fill out this field'),
        password: Yup.string()
            .required('Please fill out this field')
            .min(8, 'Minimum 8 characters'),
        confirmPassword: Yup.string()
            .required('Please fill out this field')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                staffStore.createStaff(values).catch((error) => {
                    setErrors({ error });
                })
            }
            validationSchema={addStaffValidationSchema}
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
                    <MyTextInput
                        name="password"
                        placeholder="*********"
                        type="password"
                        label="Password"
                        required
                    />
                    <MyTextInput
                        name="confirmPassword"
                        placeholder="*********"
                        type="password"
                        label="Confirm password"
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
                            animated
                            disabled={!dirty || !isValid}
                        >
                            <Button.Content visible>Submit</Button.Content>
                            <Button.Content hidden>
                                <Icon name="arrow right" />
                            </Button.Content>
                        </Button>
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
