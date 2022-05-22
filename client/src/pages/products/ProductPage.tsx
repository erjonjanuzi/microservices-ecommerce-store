import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Divider, Grid, Image, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import ProductImage from './ProductImage';

export default observer(function ProductPage() {
    const { productStore, cartStore } = useStore();
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
            <Segment>
                <Grid>
                    <Grid.Column width={9}>
                        <ProductImage product={product} />
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <h3 style={{ textTransform: 'uppercase' }}>Apple</h3>
                        <h1 style={{ fontSize: '30pt', lineHeight: '10px' }}>{product.title}</h1>
                        <h3>{product.category}</h3>
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
                                        <h2>{`${(
                                            product.price -
                                            product.price * (product.sale / 100)
                                        ).toFixed(2)}€`}</h2>
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
                                    <h2>{`${product.price.toFixed(2)}€`}</h2>
                                </>
                            )}
                        </div>

                        <br />
                        <br />
                        <Button.Group>
                            <Button
                                icon="plus"
                                onClick={() => handleQuantityChange(quantity + 1)}
                            />
                            <Button
                                icon="minus"
                                onClick={() => handleQuantityChange(quantity - 1)}
                            />
                            <Segment>{quantity}</Segment>
                        </Button.Group>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button icon="cart" secondary fluid content="Add to cart" />
                            <Button fluid basic content="Buy now" />
                        </div>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <h1>Product Details</h1>
            </Segment>
            <Segment>
                <h1>Reviews</h1>
            </Segment>
        </>
    );
});
