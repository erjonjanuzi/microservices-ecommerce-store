import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button, Icon } from 'semantic-ui-react';
import ValidationErrors from '../../login/ValidationErrors';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { useEffect, useState } from 'react';

export default observer(function AddProductForm() {
    const {
        drawerStore,
        productStore: { createProduct },
    } = useStore();
    const [selectedFiles, setSelectedFiles] = useState<FileList>();

    const validationSchema = Yup.object({
        title: Yup.string().required('Please fill out the title'),
        price: Yup.number().min(1).required('Please set a price greater than 0'),
        quantity: Yup.number().integer().required('Quantity is required'),
        description: Yup.string().required('Please provide a description'),
        category: Yup.string().required('Please provide a category'),
    });

    return (
        <Formik
            initialValues={{
                title: '',
                price: '' as unknown as number,
                quantity: '' as unknown as number,
                description: '',
                category: '',
                images: selectedFiles as any,
                error: null,
            }}
            onSubmit={(values, { setErrors }) => {
                // add the selected files to images
                values.images = selectedFiles;

                createProduct(values)
                    .then(() => {
                        drawerStore.closeDrawer();
                    })
                    .catch((error) => console.log(error));
            }}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form dark-button" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="title" placeholder="iPhone" label="Title" required />
                    <MyTextInput
                        name="price"
                        placeholder="39.90$"
                        label="Price"
                        type="number"
                        required
                    />
                    <MyTextInput
                        name="quantity"
                        placeholder="10"
                        label="Quantity"
                        type="number"
                        required
                    />
                    <MyTextArea
                        name="description"
                        placeholder="This is a description"
                        label="Description"
                        rows={3}
                    />
                    <MyTextInput name="category" placeholder="Phone" label="Category" required />
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={(event: any) => {
                            setSelectedFiles(event.target.files);
                        }}
                    />

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
                            className="dark-basic-button"
                            onClick={() => drawerStore.closeDrawer()}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
});
