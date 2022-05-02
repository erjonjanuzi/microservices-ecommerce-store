import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import ValidationErrors from '../../login/ValidationErrors';
import * as Yup from 'yup';

export default observer(function EditPersonalDetailsForm() {
    const { userStore, drawerStore, staffStore } = useStore();

    const editPersonalDetailsValidationSchema = Yup.object({
        firstName: Yup.string().required('Please fill out this field'),
        lastName: Yup.string().required('Please fill out this field'),
    });

    return (
        <Formik
            initialValues={{
                firstName: userStore.user.firstName,
                lastName: userStore.user.lastName,
                email: userStore.user.email,
                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                staffStore.updateStaff(userStore.user.id, values).then(() => window.location.reload()).catch((error) => {
                    setErrors({ error });
                })
            }
            validationSchema={editPersonalDetailsValidationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form dark-button" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="firstName" placeholder="John" label="First name" required />
                    <MyTextInput
                        name="lastName"
                        placeholder="Applesed"
                        label="Last name"
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
                            size='small'
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
});
