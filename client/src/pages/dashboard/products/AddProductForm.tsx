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
import ImagesRenderer from './ImagesRenderer';
import { toast } from 'react-toastify';
import agent from '../../../app/api/agent';
import MyFileInput from '../../../app/common/form/MyFileInput';

export default observer(function AddProductForm() {
    const {
        drawerStore,
        inventoryStore: { createProduct },
    } = useStore();
    const [selectedFiles, setSelectedFiles] = useState<FileList>();
    const [categories, setCategories] = useState<any[]>([]);

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
        manufacturer: Yup.string().required('Please fill out this field'),
        price: Yup.number().min(1).required('Please set a price greater than 0'),
        sale: Yup.number().max(100),
        quantity: Yup.number().integer().min(0).required('Quantity is required'),
        description: Yup.string().required('Please provide a description'),
        category: Yup.string().required('Please provide a category'),
    });

    useEffect(() => {
        agent.Categories.all().then((result) => {
            let tempCategories: any[] = [];
            result.forEach(category => {
                tempCategories.push({text: category.categoryName, value: category.categoryName})
            })
            setCategories(tempCategories);
        })
    }, [])

    return (
        <Formik
            initialValues={{
                title: '',
                manufacturer: '',
                price: '' as unknown as number,
                sale: '' as unknown as number,
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
                    .then(() => toast.success('Product created'))
                    .catch((error) => setErrors({ error }));
            }}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form dark-button" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="title" placeholder="iPhone" label="Title" />
                    <MyTextInput name="manufacturer" placeholder="Apple" label="Manufacturer" />
                    <MyTextInput name="price" placeholder="39.90€" label="Price" type="number" />
                    <MyTextInput
                        name="sale"
                        placeholder="15%"
                        label="Sale percentage (Optional)"
                        type="number"
                    />
                    <MyTextInput name="quantity" placeholder="5" label="Quantity" type="number" />
                    <MyTextArea
                        name="description"
                        placeholder="This is a description"
                        label="Description"
                        rows={15}
                    />
                    <MySelectInput
                        name="category"
                        placeholder="Select a category"
                        label="Category"
                        options={categories}
                    />
                    <input
                        type="file"
                        name="images"
                        value={undefined}
                        multiple
                        onChange={(event: any) => {
                            event.preventDefault();
                            setSelectedFiles(event.target.files);
                        }}
                    />
                    <br />
                    <br />
                    <ImagesRenderer
                        images={selectedFiles}
                        handleRemoveImages={handleRemoveImages}
                    />
                    <br />

                    <ErrorMessage
                        name="error"
                        render={() => <ValidationErrors errors={errors.error} />}
                    />
                    <div className="row-flex">
                        <Button
                            loading={isSubmitting}
                            positive
                            content="Submit"
                            type="submit"
                            fluid
                            disabled={!dirty || !isValid}
                        />
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
