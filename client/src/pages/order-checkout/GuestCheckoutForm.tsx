import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Checkbox, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyTextInput from '../../app/common/form/MyTextInput';
import { countryOptions } from '../../app/common/options/countryOptions';
import { useStore } from '../../app/stores/store';
import ValidationErrors from '../login/ValidationErrors';

export default observer(function GuestCheckoutForm() {
    const { checkoutStore } = useStore();
    const [billingSameAsDeliveryAddress, setBillingSameAsDeliveryAddress] = useState(true);

    useEffect(() => { billingSameAsDeliveryAddress })

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Email must be valid')
            .required('Please fill out this field'),
        firstName: Yup.string().required('Please fill out this field'),
        lastName: Yup.string().required('Please fill out this field'),
        phoneNumber: Yup.string().required('Please fill out this field'),
        deliveryCountry: Yup.string().required('Please fill out this field'),
        deliveryCity: Yup.string().required('Please fill out this field'),
        deliveryPostCode: Yup.string().required('Please fill out this field'),
        deliveryStreet: Yup.string().required('Please fill out this field'),
    });

    return (
        <>
            <Formik
                initialValues={{
                    deliveryCountry: '',
                    deliveryCity: '',
                    deliveryPostCode: '',
                    deliveryStreet: '',
                    billingCountry: '',
                    billingCity: '',
                    billingPostCode: '',
                    billingStreet: '',
                    email: '',
                    phoneNumber: '',
                    firstName: '',
                    lastName: '',
                    error: null
                }}
                onSubmit={(values, { setErrors }) =>
                    checkoutStore
                        .createOrder(checkoutStore.checkoutProducts, { ...values })
                        .catch((error: any) => {
                            setErrors({ error });
                        })
                }
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <h2>Personal Details</h2>
                        <MyTextInput
                            name="firstName"
                            placeholder="John"
                            label="First name"
                            type="text"
                            required
                            width={8}
                        />
                        <MyTextInput
                            name="lastName"
                            placeholder="Doe"
                            label="Last name"
                            type="text"
                            required
                            width={8}
                        />
                        <MyTextInput
                            name="email"
                            placeholder="johndoe@gmail.com"
                            label="Email"
                            type="email"
                            required
                        />
                        <MyTextInput
                            name="phoneNumber"
                            placeholder="Your phone number"
                            label="Phone number"
                            type="text"
                            required
                        />
                        <Divider />
                        <h2>Address</h2>
                        <h3>Delivery Address</h3>
                        <MySelectInput
                            placeholder="Country"
                            label="Country"
                            name="deliveryCountry"
                            options={countryOptions}
                        />
                        <MySelectInput
                            placeholder="City"
                            label="City"
                            name="deliveryCity"
                            options={countryOptions[0].cities}
                        />
                        <MyTextInput
                            name="deliveryPostCode"
                            placeholder="Postcode"
                            label="Postcode"
                            type="text"
                            required
                            width={8}
                        />
                        <MyTextInput
                            name="deliveryStreet"
                            placeholder="Address (Number & Street name)"
                            label="Address"
                            type="text"
                            required
                        />
                        <h3>Billing Address</h3>
                        <Checkbox
                            label='Billing address same as delivery address'
                            onChange={(e, data) => setBillingSameAsDeliveryAddress(!billingSameAsDeliveryAddress)}
                            checked={billingSameAsDeliveryAddress}
                        />
                        <br />
                        <br />
                        {!billingSameAsDeliveryAddress && <>
                            <MySelectInput
                                placeholder="Country"
                                label="Country"
                                name="billingCountry"
                                options={countryOptions}
                            />
                            <MySelectInput
                                placeholder="City"
                                label="City"
                                name="billingCity"
                                options={countryOptions[0].cities}
                            />
                            <MyTextInput
                                name="billingPostCode"
                                placeholder="Postcode"
                                label="Postcode"
                                type="text"
                                required
                                width={8}
                            />
                            <MyTextInput
                                name="billingStreet"
                                placeholder="Address (Number & Street name)"
                                label="Address"
                                type="text"
                                required
                            />
                        </>
                        }
                        <Divider />
                        <ErrorMessage
                            name="error"
                            render={() => <ValidationErrors errors={errors.error} />}
                        />
                        <Button
                            loading={isSubmitting}
                            secondary
                            type="submit"
                            fluid
                            content="Proceed"
                            icon='lock'
                            disabled={!dirty || !isValid}
                            size="small"
                            style={{ marginBottom: '5px' }}
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
});
