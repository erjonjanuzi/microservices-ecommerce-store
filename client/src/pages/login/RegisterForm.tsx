import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Icon } from 'semantic-ui-react';
import RegisterSteps from './RegisterSteps';
import { Form as SemanticForm } from 'semantic-ui-react';

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    const [step, setStep] = useState(1);
    const [value, setValue] = useState('male');
    const [registerObject, setRegisterObject] = useState<any>(undefined);

    const personalDetailsValidationSchema = Yup.object({
        firstName: Yup.string().required('Please fill out this field'),
        lastName: Yup.string().required('Please fill out this field'),
        phoneNumber: Yup.string().required('Please fill out this field'),
        email: Yup.string()
            .email('Email must be valid')
            .required('Please fill out this field'),
        password: Yup.string()
            .required('Please fill out this field')
            .min(8, 'Minimum 8 characters'),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match'
        ),
    });

    return (
        <>
            <RegisterSteps step={step} />
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    gender: value,
                    phoneNumber: '',
                    email: '',
                    password: '',
                    error: null,
                }}
                onSubmit={(values, { setErrors }) =>
                    // userStore
                    //     .login(values)
                    //     .catch((error) =>
                    //         setErrors({ error: error.response.data })
                    //     )
                    setRegisterObject(values)
                }
                validationSchema={personalDetailsValidationSchema}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <>
                        <Form
                            className="ui form"
                            onSubmit={handleSubmit}
                            autoComplete="off"
                        >
                            <MyTextInput
                                name="firstName"
                                placeholder="e.g. Erjon"
                                label="First name"
                                type="text"
                                required
                            />
                            <MyTextInput
                                name="lastName"
                                placeholder="e.g. Januzi"
                                label="Last name"
                                type="text"
                                required
                            />
                            <SemanticForm.Group inline>
                                <SemanticForm.Radio
                                    label="Male"
                                    value="male"
                                    checked={value === 'male'}
                                    onChange={() => setValue('male')}
                                />
                                <SemanticForm.Radio
                                    label="Female"
                                    value="female"
                                    checked={value === 'female'}
                                    onChange={() => setValue('female')}
                                />
                            </SemanticForm.Group>
                            <MyTextInput
                                name="phoneNumber"
                                placeholder="e.g. 043922777"
                                type="text"
                                label="Phone number"
                                required
                                width={8}
                            />
                            <MyTextInput
                                name="email"
                                placeholder="e.g. john@applesed.com"
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
                            <Button
                                loading={isSubmitting}
                                secondary
                                type="submit"
                                fluid
                                animated
                            >
                                <Button.Content visible>Next</Button.Content>
                                <Button.Content hidden>
                                    <Icon name="arrow right" />
                                </Button.Content>
                            </Button>
                        </Form>
                    </>
                )}
            </Formik>
        </>
    );
});
