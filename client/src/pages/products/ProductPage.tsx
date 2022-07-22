import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Divider, Grid, Image, Label, Rating, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import ProductImage from './ProductImage';
import { history } from '../..';
import AddedToCartSuccessView from '../cart/AddedToCartSuccessView';
import ProductReviewsSection from './ProductReviewsSection';
import SimilarProducts from './SimilarProducts';

const difference = (date1: Date, date2: Date) => {
    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day;
};

export default observer(function ProductPage() {
    const { productStore, cartStore, modalStore, checkoutStore } = useStore();
    const {
        selectedProduct: product,
        loadProduct,
        loadingInitial,
        clearSelectedProduct,
    } = productStore;
    const { id } = useParams<{ id: string }>();
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (qty: number) => {
        if (qty < 1) {
            setQuantity(1);
        } else if (qty > product?.quantity!) {
            setQuantity(product?.quantity!);
        } else {
            setQuantity(qty);
        }
    };

    useEffect(() => {
        if (id) loadProduct(id);
    }, [id, loadProduct, clearSelectedProduct]);

    if (loadingInitial || !product) return <LoadingComponent />;

    return (
        <>
            <div style={{ marginTop: '50px' }}></div>
            <Grid>
                <Grid.Column width={9}>
                    <ProductImage images={product.images} />
                </Grid.Column>
                <Grid.Column width={7}>
                    {difference(new Date(product.createdAt), new Date()) <= 7 && (
                        <Card.Meta style={{ marginBottom: '10px' }}>
                            <Label basic color="green" content="New" size="tiny" />
                            {product.sale > 0 &&
                                <Label basic color="red" content="%ONSALE%" size="tiny" />
                            }
                        </Card.Meta>
                    )}
                    <h3 style={{ marginTop: '15px' }}>{product.manufacturer}</h3>
                    <h1 style={{ fontSize: '30pt', lineHeight: '10px' }}>{product.title}</h1>
                    <h3>{product.category}</h3>
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
                                    size='huge'
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
                                <Rating defaultRating={0} maxRating={5} disabled size='huge' />
                                <p style={{ marginLeft: '5px' }}>(No ratings yet)</p>
                            </div>
                        </>
                    )}
                    <p>{product.description.length < 100
                        ? product.description
                        : `${product.description.slice(0, 100)}...`}</p>
                    <h3>
                        <Label basic content={`${product.quantity} available in stock`} />
                    </h3>
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
                                    <h5>
                                        <s>{`${product.price.toFixed(2)}€`}</s>
                                    </h5>
                                </div>
                                <div style={{ margin: '0 5px 0 5px' }}>
                                    <h1>{`${(
                                        product.price -
                                        product.price * (product.sale / 100)
                                    ).toFixed(2)} €`}</h1>
                                </div>
                                <label
                                    style={{
                                        border: '1px dashed red',
                                        color: 'red',
                                        padding: '3px',
                                    }}
                                >
                                    {`-${product.sale}%`}
                                </label>
                            </>
                        ) : (
                            <>
                                <h1>{`${product.price.toFixed(2)} €`}</h1>
                            </>
                        )}
                    </div>

                    <br />
                    <br />
                    <Button.Group style={{ border: '1px solid #f4f4f4' }}>
                        <Button
                            icon="plus"
                            size='tiny'
                            onClick={() => handleQuantityChange(quantity + 1)}
                        />
                        <Button
                            basic
                            disabled
                            size='tiny'
                            content={quantity}
                        />
                        <Button
                            icon="minus"
                            size='tiny'
                            onClick={() => handleQuantityChange(quantity - 1)}
                        />
                    </Button.Group>
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button icon="cart" secondary fluid content="Add to cart"
                            onClick={() => cartStore.addProductToCart(product.id, quantity)
                                .then(() => modalStore.openModal(<AddedToCartSuccessView product={product} />, 'small', 'white'))} />
                        <Button icon='tag' fluid basic content="Buy now"
                            onClick={() => checkoutStore.checkoutBuyNow(product.id).then(() => history.push('/checkout'))} />
                    </div>
                </Grid.Column>
            </Grid>
            <Divider />
            <h1>Product Description and Details</h1>
            <p>{product.description}</p>
            <Divider />
            <ProductReviewsSection />
            <Divider />
            <SimilarProducts productId={product.id} />
        </>
    );
});
