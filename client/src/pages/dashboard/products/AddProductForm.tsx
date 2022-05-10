import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button, Icon } from 'semantic-ui-react';
import ValidationErrors from '../../login/ValidationErrors';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { useState } from 'react';

export default observer(function AddProductForm() {
    const { drawerStore, productStore: {createProduct} } = useStore();
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event: any) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

    const validationSchema = Yup.object({
        title: Yup.string().required('Please fill out this field'),
    });

    return (
        <Formik
            initialValues={{ title: '', price: 0, quantity: 0, description: '', category: '', images: selectedFile, error: null }}
            onSubmit={(values, { setErrors }) => createProduct(values)}
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
                    <MyTextInput name='category' placeholder='Phone' label='Category' required />
                    <input type="file" name="images" onChange={changeHandler} />

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
