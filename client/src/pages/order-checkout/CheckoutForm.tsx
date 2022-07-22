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

export default observer(function CheckoutForm() {
    const { userStore, checkoutStore } = useStore();
    const [billingSameAsDeliveryAddress, setBillingSameAsDeliveryAddress] = useState(true);

    useEffect(() => { billingSameAsDeliveryAddress })

    const validationSchema = Yup.object({
        deliveryCountry: Yup.string().required('Please fill out this field'),
        deliveryCity: Yup.string().required('Please fill out this field'),
        deliveryPostCode: Yup.string().required('Please fill out this field'),
        deliveryStreet: Yup.string().required('Please fill out this field'),
    });

    return (
        <>
            <h2>Personal Details</h2>
            <p>{userStore.user.firstName}</p>
            <p>{userStore.user.lastName}</p>
            <p>{userStore.user.email}</p>
            <p>{userStore.user.personalDetails.phoneNumber}</p>
            <Divider />
            <h2>Address</h2>
            <Formik
                initialValues={userStore.user.deliveryAddress ? {
                    deliveryCountry: userStore.user.deliveryAddress.country,
                    deliveryCity: userStore.user.deliveryAddress.country,
                    deliveryPostCode: userStore.user.deliveryAddress.postCode,
                    deliveryStreet: userStore.user.deliveryAddress.street,
                    billingCountry: '',
                    billingCity: '',
                    billingPostCode: '',
                    billingStreet: '',
                    email: userStore.user.email,
                    phoneNumber: userStore.user.personalDetails.phoneNumber,
                    firstName: userStore.user.firstName,
                    lastName: userStore.user.lastName,
                    error: null
                } : {
                    deliveryCountry: '',
                    deliveryCity: '',
                    deliveryPostCode: '',
                    deliveryStreet: '',
                    billingCountry: '',
                    billingCity: '',
                    billingPostCode: '',
                    billingStreet: '',
                    email: userStore.user.email,
                    phoneNumber: userStore.user.personalDetails.phoneNumber,
                    firstName: userStore.user.firstName,
                    lastName: userStore.user.lastName,
                    error: null
                }}
                onSubmit={(values, { setErrors }) =>
                    checkoutStore
                        .createOrder(checkoutStore.checkoutProducts, {...values})
                        .catch((error: any) => {
                            setErrors({ error });
                        })
                }
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
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
