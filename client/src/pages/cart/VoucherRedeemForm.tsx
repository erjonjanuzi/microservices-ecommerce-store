import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import ValidationErrors from "../login/ValidationErrors";

export default observer(function VoucherRedeemForm() {
    return (
        <>
            <h4>Redeem a voucher</h4>
            <Formik initialValues={{ voucher: '', error: null }}
                onSubmit={(values, { setErrors }) =>
                    console.log(values)
                }>
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form
                        className="ui form"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <MyTextInput
                            name="voucher"
                            placeholder="Promo Code"
                            type="text"
                        />
                        <ErrorMessage
                            name="error"
                            render={() => (
                                <ValidationErrors errors={errors.error} />
                            )}
                        />
                        <Button
                            loading={isSubmitting}
                            secondary
                            content="Redeem"
                            type="submit"
                            fluid
                            disabled={!dirty || !isValid}
                        />
                    </Form>
                )}
            </Formik>
        </>
    )
})