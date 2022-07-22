import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Checkbox, Divider, Rating, RatingProps } from 'semantic-ui-react';
import * as Yup from 'yup';
import MySelectInput from '../../app/common/form/MySelectInput';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';
import { countryOptions } from '../../app/common/options/countryOptions';
import { useStore } from '../../app/stores/store';
import ValidationErrors from '../login/ValidationErrors';

interface Props {
    productId: string;
}

export default observer(function AddReviewForm({ productId }: Props) {
    const { userStore, productStore, modalStore } = useStore();
    const [includeComment, setIncludeComment] = useState(true);
    const [rating, setRating] = useState<any>(0);

    const handleRatingChange = (_: any, data: RatingProps) => {
        setRating(data.rating);
    }

    useEffect(() => { includeComment })

    return (
        <>
            <Formik
                initialValues={{
                    productId: productId,
                    firstName: userStore.user.firstName,
                    lastName: userStore.user.lastName,
                    comment: '',
                    rating: '',
                    error: null
                }}
                onSubmit={(values, { setErrors }) => {
                    const body: {
                        productId: string, review:
                        { rating: number, firstName?: string, lastName?: string, comment?: string, }
                    } = {
                        productId: values.productId,
                        review: {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            comment: values.comment,
                            // @ts-ignore
                            rating: rating
                        }
                    }
                    productStore.postReview(body).then(() => {
                        modalStore.closeModal();
                        toast.success('Review posted successfully');
                    }).catch((error: any) => {
                        setErrors({ error });
                    })
                }}
                enableReinitialize
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <label>Rating</label>
                        <br />
                        <Rating onRate={handleRatingChange} maxRating={5} rating={rating} size='massive' />
                        <br />
                        <br />
                        {includeComment &&
                            <MyTextArea label='Comment' name='comment' placeholder='Your review...' rows={5} />
                        }
                        <Checkbox
                            label='Include comment'
                            onChange={(e, data) => setIncludeComment(!includeComment)}
                            checked={includeComment}
                        />
                        <br />
                        <ErrorMessage
                            name="error"
                            render={() => <ValidationErrors errors={errors.error} />}
                        />
                        <Divider />
                        <div className="row-flex">
                            <Button
                                loading={isSubmitting}
                                secondary
                                type="submit"
                                fluid
                                content="Post review"
                                disabled={rating === 0 || (includeComment && !dirty && !isValid)}
                                size="small"
                                style={{ marginBottom: '5px' }}
                            />
                            <Button
                                content="Cancel"
                                fluid
                                basic
                                onClick={() => modalStore.closeModal()}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
});
