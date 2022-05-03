import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { Button, Divider } from 'semantic-ui-react';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import ValidationErrors from '../login/ValidationErrors';

export default observer(function EditPersonalInformationForm() {
    const { userStore, drawerStore } = useStore();

    const editPersonalDetailsValidationSchema = Yup.object({
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
            validationSchema={editPersonalDetailsValidationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="firstName" placeholder="John" label="First name" />
                    <MyTextInput name="lastName" placeholder="Applesed" label="Last name" />
                    <MyTextInput
                        name="phoneNumber"
                        placeholder="+38343922666"
                        label="Phone number"
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
