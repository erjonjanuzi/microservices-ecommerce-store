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

export default observer(function AddDeliveryAddress() {
    const { userStore, drawerStore } = useStore();
    const [sameAsAccountAddress, setSameAsAccountAddress] = useState(false);

    const addressSchema = Yup.object({
        country: Yup.string().required('Please fill out this field'),
        city: Yup.string().required('Please fill out this field'),
        postCode: Yup.string().required('Please fill out this field'),
        street: Yup.string().required('Please fill out this field'),
    });

    useEffect(() => { }, [sameAsAccountAddress])

    return (
        <>
            <Checkbox
                label='Delivery address same as account address'
                onChange={(e, data) => setSameAsAccountAddress(!sameAsAccountAddress)}
                checked={sameAsAccountAddress}
            />
            <br />
            <br />
            <Formik
                initialValues={
                    sameAsAccountAddress ? {
                        country: userStore.user.address.country,
                        city: userStore.user.address.city,
                        postCode: userStore.user.address.postalCode,
                        street: userStore.user.address.street,
                        error: null,
                    } : {
                        country: '',
                        city: '',
                        postCode: '',
                        street: '',
                        error: null
                    }}
                onSubmit={(values, { setErrors }) =>
                    userStore
                        .addDeliveryAddress(values)
                        .then(() => {
                            drawerStore.closeDrawer();
                            toast.success('Delivery address added');
                        })
                        .catch((error) => {
                            setErrors({ error });
                        })
                }
                validationSchema={addressSchema}
                enableReinitialize
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MySelectInput
                            placeholder="Country"
                            label="Country"
                            name="country"
                            options={countryOptions}
                            disabled={sameAsAccountAddress}
                        />
                        <MySelectInput
                            placeholder="City"
                            label="City"
                            name="city"
                            options={countryOptions[0].cities}
                            disabled={sameAsAccountAddress}
                        />
                        <MyTextInput
                            name="postCode"
                            placeholder="Postcode"
                            label="Postcode"
                            type="text"
                            required
                            width={8}
                            disabled={sameAsAccountAddress}
                        />
                        <MyTextInput
                            name="street"
                            placeholder="Address (Number & Street name)"
                            label="Address"
                            type="text"
                            required
                            disabled={sameAsAccountAddress}
                        />
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
                            content="Save"
                            disabled={!sameAsAccountAddress && !dirty || !isValid}
                            size="small"
                            style={{ marginBottom: '5px' }}
                        />
                        <Button
                            content="Cancel"
                            fluid
                            onClick={() => drawerStore.closeDrawer()}
                            size="small"
                            basic
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
});
