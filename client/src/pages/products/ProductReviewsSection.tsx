import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { Button, Comment, Divider, Grid, Icon, Label, Loader, Rating } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import AddReviewForm from './AddReviewForm';

export default observer(function ProductReviewsSection() {
    const { productStore, userStore, modalStore } = useStore();
    const {
        selectedProduct: product,
    } = productStore;

    if (!product) return <Loader active />

    return (
        <>
            <Grid>
                <Grid.Column width={12}>
                    <h1>Reviews ({product?.reviews.length})</h1>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Button disabled={!userStore.user || !userStore.user.emailConfirmed}
                        content='Leave a review'
                        secondary
                        fluid
                        onClick={() => modalStore.openModal(<AddReviewForm productId={product.id} />, 'small', 'white')}
                    />
                    {!userStore.user && <p>You need to sign in to leave a review</p>}
                    {userStore.user && !userStore.user.emailConfirmed && <p>You need to confirm your email to leave a review</p>}
                </Grid.Column>
            </Grid>
            <Comment.Group>
                {product?.reviews.map((review) => {
                    if (review.comment) {
                        return <Grid>
                            <Grid.Column width={14}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ marginRight: '10px' }}>
                                        <Label content={`${review.firstName![0]}${review.lastName![0]}`} circular color='purple' size='big' />
                                    </div>
                                    <Comment>
                                        <Comment.Content>
                                            <Comment.Author>{`${review.firstName} ${review.lastName}`}</Comment.Author>
                                            <Comment.Metadata>
                                                <div>
                                                    {(new Date(review.createdAt)).toLocaleDateString('en-US')}
                                                </div>
                                                <br />
                                                <div>
                                                    <Rating icon='star' defaultRating={review.rating} maxRating={5} disabled />
                                                </div>
                                            </Comment.Metadata>
                                            <Comment.Text>
                                                {review.comment}
                                            </Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                {userStore.user && review.userId === userStore.user.id &&
                                    <Button icon='trash alternate outline'
                                        negative
                                        onClick={() => productStore.deleteReview({ productId: product.id, reviewId: review._id })
                                            .then(() => toast.info('Review deleted successfully'))}
                                    />}
                            </Grid.Column>
                        </Grid>
                    }
                })}
            </Comment.Group>
        </>
    );
});
