import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button, Icon } from 'semantic-ui-react';
import ValidationErrors from '../../login/ValidationErrors';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { useEffect, useState } from 'react';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import ImagesRenderer from './ImagesRenderer';

export default observer(function AddProductForm() {
    const {
        drawerStore,
        productStore: { createProduct },
    } = useStore();
    const [selectedFiles, setSelectedFiles] = useState<FileList>();

    const handleRemoveImages = (index: number) => {
        const dt = new DataTransfer();
        let files = selectedFiles;

        for (let i = 0; i < files!.length; i++) {
            const file = files![i];
            if (index !== i) dt.items.add(file);
        }

        files = dt.files;
        setSelectedFiles(files);
    };

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
                    <MyTextInput name="title" placeholder="iPhone" label="Title" />
                    <MyTextInput name="price" placeholder="39.90€" label="Price" type="number" />
                    <MyTextInput name="quantity" placeholder="5" label="Quantity" type="number" />
                    <MyTextArea
                        name="description"
                        placeholder="This is a description"
                        label="Description"
                        rows={15}
                    />
                    <MySelectInput
                        name="category"
                        placeholder="Phone"
                        label="Category"
                        options={categoryOptions}
                    />
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={(event: any) => {
                            setSelectedFiles(event.target.files);
                        }}
                    />
                    <br />
                    <br />
                    <ImagesRenderer
                        images={selectedFiles}
                        handleRemoveImages={handleRemoveImages}
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
