import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Divider, Loader } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from "formik";
import { toast } from "react-toastify";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import ValidationErrors from "../../login/ValidationErrors";
import agent from "../../../app/api/agent";

interface Props {
    id: string;
}

export default observer(function EditProductForm({id}: Props){
    const { inventoryStore, drawerStore } = useStore();
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        if (id) inventoryStore.loadProduct(id);
        agent.Categories.all().then((result) => {
            let tempCategories: any[] = [];
            result.forEach(category => {
                tempCategories.push({text: category.categoryName, value: category.categoryName})
            })
            setCategories(tempCategories);
        })
        return () => inventoryStore.clearSelectedProduct();
    }, []);

    if (!inventoryStore.selectedProduct) return <Loader active />;

    const editProductValidationSchema = Yup.object({
        title: Yup.string().required('Please fill out the title'),
        manufacturer: Yup.string().required('Please fill out this field'),
        price: Yup.number().min(1).required('Please set a price greater than 0'),
        sale: Yup.number().max(100),
        quantity: Yup.number().integer().min(0).required('Quantity is required'),
        description: Yup.string().required('Please provide a description'),
        category: Yup.string().required('Please provide a category'),
    });

    return (
        <Formik
            initialValues={{
                title: inventoryStore.selectedProduct.title,
                manufacturer: inventoryStore.selectedProduct.manufacturer,
                price: inventoryStore.selectedProduct.price,
                quantity: inventoryStore.selectedProduct.quantity,
                description: inventoryStore.selectedProduct.description,
                category: inventoryStore.selectedProduct.category,
                sale: inventoryStore.selectedProduct.sale,

                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                inventoryStore.updateProduct(id, values).then(() => {
                    drawerStore.closeDrawer();
                    toast.success('Product updated successfully')
                }).catch((error) => {
                    setErrors({ error });
                })
            }
            validationSchema={editProductValidationSchema}
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
    )
})