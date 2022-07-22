import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import MyTextInput from '../../app/common/form/MyTextInput';
import ValidationErrors from './ValidationErrors';
import { Button } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

export default observer(function ForgotPassword() {
    const { userStore } = useStore();
    const [emailSent, setEmailSent] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email('Email must be valid').required('Please fill out this field'),
    });

    useEffect(() => { }, [emailSent]);

    return emailSent ? (
        <>
            <div style={{ minHeight: '100vh', marginTop: '50px' }}>
                <h1>check your email</h1>
            </div>
        </>
    ) : (
        <div style={{ minHeight: '100vh', marginTop: '50px' }}>
            <Formik
                initialValues={{ email: '', error: null }}
                onSubmit={(values, { setErrors }) =>
                    userStore
                        .forgotPassword(values)
                        .then(() => setEmailSent(true))
                        .catch((error) => {
                            setErrors({ error });
                        })
                }
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput
                            name="email"
                            placeholder="john@applesed.com"
                            label="Email"
                            type="email"
                            required
                        />
                        <ErrorMessage
                            name="error"
                            render={() => <ValidationErrors errors={errors.error} />}
                        />
                        <Button
                            loading={isSubmitting}
                            secondary
                            content="Send"
                            type="submit"
                            fluid
                            disabled={!dirty || !isValid}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
});
