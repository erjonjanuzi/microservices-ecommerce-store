import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Divider, Icon } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import ValidationErrors from '../../login/ValidationErrors';
import * as Yup from 'yup';

export default observer(function AddCategoryForm(){
    const { categoryStore, drawerStore } = useStore();

    const addCategoryValidationSchema = Yup.object({
        categoryName: Yup.string().required('Please fill out this field'),
    });

    return (
        <Formik
            initialValues={{ categoryName: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                categoryStore.createCategory(values).then(() => drawerStore.closeDrawer()).catch((error) => {
                    setErrors({ error });
                })
            }
            validationSchema={addCategoryValidationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form dark-button" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="categoryName" placeholder="i.e. Phones" label="Category" required />
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
                            animated
                            disabled={!dirty || !isValid}
                        >
                            <Button.Content visible>Submit</Button.Content>
                            <Button.Content hidden>
                                <Icon name="arrow right" />
                            </Button.Content>
                        </Button>
                        <Button
                            content="Cancel"
                            fluid
                            className='dark-basic-button'
                            onClick={() => drawerStore.closeDrawer()}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    )
})