import ValidationErrors from '../../login/ValidationErrors';
import * as Yup from 'yup';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import { Button, Divider, Loader } from 'semantic-ui-react';
import { ErrorMessage, Form, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';

interface Props {
    id: string;
}

export default observer(function EditCategoryForm({ id }: Props) {
    const { categoryStore, drawerStore } = useStore();

    useEffect(() => {
        if (id) categoryStore.getCategoryById(id);
        return () => categoryStore.clearSelectedCategory();
    }, [categoryStore.getCategoryById]);

    if (!categoryStore.selectedCategory) return <Loader active />;

    const editCategoryValidationSchema = Yup.object({
        categoryName: Yup.string().required('Please fill out this field'),
    });

    return (
        <Formik
            initialValues={{
                categoryName: categoryStore.selectedCategory.categoryName,
                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                categoryStore.editCategory(id, values).then(() => drawerStore.closeDrawer()).catch((error) => {
                    setErrors({ error });
                })
            }
            validationSchema={editCategoryValidationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form dark-button" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="categoryName" placeholder="Name" label="Category" required />
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
                            className='dark-basic-button'
                            onClick={() => drawerStore.closeDrawer()}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
});
