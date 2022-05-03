import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { Button, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyTextInput from '../../app/common/form/MyTextInput';
import { countryOptions } from '../../app/common/options/countryOptions';
import { useStore } from '../../app/stores/store';
import ValidationErrors from '../login/ValidationErrors';

export default observer(function UpdateAddress() {
    const { userStore, drawerStore } = useStore();

    const addressSchema = Yup.object({
        firstName: Yup.string().required('Please fill out this field'),
        lastName: Yup.string().required('Please fill out this field'),
        phoneNumber: Yup.string().required('Please fill out this field'),
    });

    return (
        <Formik
            initialValues={{
                firstName: userStore.user.firstName,
                lastName: userStore.user.lastName,
                phoneNumber: userStore.user.personalDetails.phoneNumber,
                country: userStore.user.address.country,
                city: userStore.user.address.city,
                postalCode: userStore.user.address.postalCode,
                street: userStore.user.address.street,
                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                userStore
                    .updateCustomer(userStore.user.id, values)
                    .then(() => {
                        drawerStore.closeDrawer();
                        toast.success('Information updated');
                    })
                    .catch((error) => {
                        setErrors({ error });
                    })
            }
            validationSchema={addressSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
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
                        disabled={!dirty || !isValid}
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
    );
});
