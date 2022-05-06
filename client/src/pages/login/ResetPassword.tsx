import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import ValidationErrors from './ValidationErrors';
import { Button } from 'semantic-ui-react';

export default observer(function ResetPassword() {
    const { userStore } = useStore();

    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setToken(new URLSearchParams(location.search).get('token')!);
        setEmail(new URLSearchParams(location.search).get('email')!);
    });

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .required('Please fill out this field')
            .min(8, 'Minimum 8 characters'),
        confirmPassword: Yup.string()
            .required('Please fill out this field')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    return (
        <>
            <h1>Reset password</h1>
            <Formik
                initialValues={{ email, token, newPassword: '', error: null }}
                onSubmit={(values, { setErrors }) =>
                    userStore.forgotPassword(values).catch((error) => {
                        setErrors({ error });
                    })
                }
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput
                            name="newPassword"
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
                        <ErrorMessage
                            name="error"
                            render={() => <ValidationErrors errors={errors.error} />}
                        />
                        <Button
                            loading={isSubmitting}
                            secondary
                            content="Reset"
                            type="submit"
                            fluid
                            disabled={!dirty || !isValid}
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
});
