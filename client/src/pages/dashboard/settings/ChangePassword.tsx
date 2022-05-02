import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import ValidationErrors from '../../login/ValidationErrors';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default observer(function ChangePassword() {
    const { userStore, drawerStore } = useStore();

    const changePasswordValidationSchema = Yup.object({
        currentPassword: Yup.string().required('Please fill out this field'),
        newPassword: Yup.string()
            .required('Please fill out this field')
            .min(8, 'Minimum 8 characters'),
        confirmNewPassword: Yup.string()
            .required('Please fill out this field')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    return (
        <Formik
            initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                userStore
                    .updatePassword(values)
                    .then(() => drawerStore.closeDrawer())
                    .then(() => toast.success('Password updated successfully'))
                    .catch((error) => {
                        setErrors({ error });
                    })
            }
            validationSchema={changePasswordValidationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form dark-button" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput
                        name="currentPassword"
                        placeholder="*********"
                        type="password"
                        label="Current password"
                        required
                    />
                    <MyTextInput
                        name="newPassword"
                        placeholder="*********"
                        type="password"
                        label="New password"
                        required
                    />
                    <MyTextInput
                        name="confirmNewPassword"
                        placeholder="*********"
                        type="password"
                        label="Confirm new password"
                        required
                    />
                    <Divider />
                    <ErrorMessage
                        name="error"
                        render={() => <ValidationErrors errors={errors.error} />}
                    />
                    <div className="row-flex">
                        <Button
                            loading={isSubmitting}
                            positive
                            type="submit"
                            fluid
                            content="Update"
                            disabled={!dirty || !isValid}
                        />
                        <Button
                            content="Cancel"
                            fluid
                            onClick={() => drawerStore.closeDrawer()}
                            size="small"
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
});
