import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Icon } from 'semantic-ui-react';
import RegisterSteps from './RegisterSteps';
import MySelectInput from '../../app/common/form/MySelectInput';
import { countryOptions } from '../../app/common/options/countryOptions';
import ValidationErrors from './ValidationErrors';
import { history } from '../..';

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    const [step, setStep] = useState(1);
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
        confirmPassword: Yup.string().required('Please fill out this field').oneOf(
            [Yup.ref('password'), null],
            'Passwords must match'
        ),
    });

    const addressValidationSchema = Yup.object({
        country: Yup.string().required('Please fill out this field'),
        street: Yup.string().required('Please fill out this field'),
        postalCode: Yup.string().required('Please fill out this field'),
        city: Yup.string().required('Please fill out this field'),
    });

    return (
        <>
            <RegisterSteps step={step} />
            {step === 1 && <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    email: '',
                    password: '',
                    error: null,
                }}
                onSubmit={(values, { setErrors }) =>
                    userStore
                        .checkPersonalDetails(values)
                        .then(() => {
                            setRegisterObject(values);
                            setStep(2);
                        })
                        .catch((error) => {
                            setErrors({ error });
                        })
                }
                validationSchema={personalDetailsValidationSchema}
            >
                {({
                    handleSubmit,
                    isSubmitting,
                    errors,
                    isValid,
                    dirty,
                }) => (
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
                            <ErrorMessage
                                name="error"
                                render={() => (
                                    <ValidationErrors
                                        errors={errors.error}
                                    />
                                )}
                            />
                            <Button
                                loading={isSubmitting}
                                secondary
                                type="submit"
                                fluid
                                animated
                                disabled={!dirty || !isValid}
                            >
                                <Button.Content visible>
                                    Next
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name="arrow right" />
                                </Button.Content>
                            </Button>
                            <br />
                            <a href="" onClick={(e: any) => {
                                e.preventDefault();
                                history.push('/login#tab=login')
                            }}>Already have an account? Login instead</a>
                        </Form>
                    </>
                )}
            </Formik>}

            {step === 2 &&
                <Formik
                    initialValues={{
                        country: '',
                        street: '',
                        postalCode: '',
                        city: '',
                        error: null,
                    }}
                    onSubmit={(values, { setErrors }) =>
                        userStore
                            .register(registerObject, values)
                            .catch((error) =>
                                setErrors({ error: error.response.data })
                            )
                    }
                    validationSchema={addressValidationSchema}
                >
                    {({
                        handleSubmit,
                        isSubmitting,
                        errors,
                        isValid,
                        dirty,
                    }) => (
                        <>
                            <Form
                                className="ui form"
                                onSubmit={handleSubmit}
                                autoComplete="off"
                            >
                                <MySelectInput
                                    placeholder="Country"
                                    label="Country"
                                    name="country"
                                    options={countryOptions}
                                />
                                <MySelectInput
                                    placeholder="City"
                                    label="City"
                                    name="city"
                                    options={countryOptions[0].cities}
                                />
                                <MyTextInput
                                    name="postalCode"
                                    placeholder="Postcode"
                                    label="Postcode"
                                    type="text"
                                    required
                                    width={8}
                                />
                                <MyTextInput
                                    name="street"
                                    placeholder="Address (Number & Street name)"
                                    label="Address"
                                    type="text"
                                    required
                                />
                                <ErrorMessage
                                    name="error"
                                    render={() => (
                                        <ValidationErrors
                                            errors={errors.error}
                                        />
                                    )}
                                />
                                <Button
                                    loading={isSubmitting}
                                    secondary
                                    type="submit"
                                    fluid
                                    animated
                                    disabled={!dirty || !isValid}
                                >
                                    <Button.Content visible>
                                        Register
                                    </Button.Content>
                                    <Button.Content hidden>
                                        <Icon name="arrow right" />
                                    </Button.Content>
                                </Button>
                            </Form>
                        </>
                    )}
                </Formik>}
        </>
    );
});
