import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Card, Comment, Grid, Image, Label, Loader, Rating } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import { useStore } from "../../../app/stores/store";

const difference = (date1: Date, date2: Date) => {
    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day;
};

interface Props {
    product: Product
}

export default observer(function ViewDetails({ product }: Props) {
    const {userStore, productStore} = useStore();

    useEffect(() => {

    }, [product])

    return (
        <>
            <h1>Product preview</h1>
            <Grid>
                <Grid.Column width={5}>
                    <Card className='product-card'>
                        <Image
                            src={product.images[0].url}
                            wrapped
                            ui={false}
                        />
                        <Card.Content>
                            {difference(new Date(product.createdAt), new Date()) <= 7 && (
                                <Card.Meta style={{ marginBottom: '10px' }}>
                                    <Label basic color="green" content="New" size="tiny" />
                                    {product.sale > 0 &&
                                        <Label basic color="red" content="%ONSALE%" size="tiny" />
                                    }
                                </Card.Meta>
                            )}
                            <Card.Header className='underline-title'>
                                {product.title}
                            </Card.Header>
                            <Card.Meta>{product.category}</Card.Meta>
                            <Card.Description>
                                {product.rating ? (
                                    <>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            <Rating
                                                defaultRating={Math.round(product.rating * 10) / 10}
                                                maxRating={5}
                                                disabled
                                            />
                                            <p style={{ marginLeft: '5px' }}>{product.rating.toFixed(1)}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            <Rating defaultRating={0} maxRating={5} disabled />
                                            <p style={{ marginLeft: '5px' }}>No ratings yet</p>
                                        </div>
                                    </>
                                )}

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        color: 'black',
                                    }}
                                >
                                    {product.sale > 0 ? (
                                        <>
                                            <div>
                                                <h5 style={{ fontWeight: 'lighter', fontSize: '9pt' }}>
                                                    <s>{`${product.price.toFixed(2)}€`}</s>
                                                </h5>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3>{`${product.price.toFixed(2)}€`}</h3>
                                        </>
                                    )}
                                </div>
                            </Card.Description>
                            <Card.Description>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    {product.sale > 0 &&
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                color: 'black',
                                            }}
                                        >
                                            <div style={{ margin: '0 5px 0 0' }}>
                                                <h3>{`${(
                                                    product.price -
                                                    product.price * (product.sale / 100)
                                                ).toFixed(2)} €`}</h3>
                                            </div>
                                            <label
                                                style={{
                                                    border: '1px dashed red',
                                                    color: 'red',
                                                    padding: '3px',
                                                    fontSize: '8pt'
                                                }}
                                            >
                                                {`-${product.sale}%`}
                                            </label>
                                        </div>
                                    }
                                </div>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column width={11}>
                    <div style={{backgroundColor: 'white'}}>
                    <Comment.Group style={{backgroundColor: 'white'}}>
                        {product.reviews.map((review) => {
                            if (review.comment) {
                                return <Grid>
                                    <Grid.Column width={14}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',backgroundColor: 'white' }}>
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
                                        {userStore.user && userStore.user.role === 'admin' &&
                                            <Button icon='trash alternate outline'
                                                negative
                                                onClick={() => productStore.deleteReview({ productId: product.id, reviewId: review._id })
                                                    .then(() => toast.info('Review deleted successfully'))
                                                    .catch((error: any) => toast.error(error.message))
                                                }
                                            />}
                                    </Grid.Column>
                                </Grid>
                            }
                        })}
                    </Comment.Group>
                    </div>
                </Grid.Column>
            </Grid>
        </>
    )
})