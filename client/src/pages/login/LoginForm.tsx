import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from './ValidationErrors';
import { history } from '../..';

export default observer(function LoginForm() {
    const { userStore } = useStore();

    const loginValidationSchema = Yup.object({
        email: Yup.string()
            .email('Email must be valid')
            .required('Please fill out this field'),
        password: Yup.string().required('Please fill out this field'),
    });

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.login(values).catch((error) => {
                    setErrors({ error });
                })
            }
            validationSchema={loginValidationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form
                    className="ui form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
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
                    <a href="" onClick={(e: any) => {
                        e.preventDefault();
                        history.push('/forgotpassword')
                    }}>Forgot password</a>
                    <ErrorMessage
                        name="error"
                        render={() => (
                            <ValidationErrors errors={errors.error} />
                        )}
                    />
                    <Button
                        loading={isSubmitting}
                        secondary
                        content="Login"
                        type="submit"
                        fluid
                        disabled={!dirty || !isValid}
                    />
                </Form>
            )}
        </Formik>
    );
});
