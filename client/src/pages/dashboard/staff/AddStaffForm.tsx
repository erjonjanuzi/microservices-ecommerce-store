import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import ValidationErrors from '../../login/ValidationErrors';

export default observer(function AddStaffForm() {
    const { staffStore } = useStore();

    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                staffStore.createStaff(values).catch((error) => {
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
                    <MyTextInput
                        name="password"
                        placeholder="*********"
                        type="password"
                        label="Password"
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
