import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { CartItem } from '../../app/models/cart';

interface Props {
    cartItem: CartItem;
}

export default observer(function CheckoutItemView({ cartItem }: Props) {
    return (
        <Segment secondary>
            <Grid>
                <Grid.Column width={4}>
                    
                        <div
                            style={{
                                width: '100%',
                                height: '80px',
                                textAlign: 'center',
                                verticalAlign: 'center',
                                backgroundColor: 'white',
                            }}
                        >
                            <img
                                src={cartItem.product.image}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                            />
                        </div>
                </Grid.Column>
                <Grid.Column width={10}>
                    <p><b>{cartItem.product.title}</b></p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: 'black',
                        }}
                    >
                        {cartItem.product.sale > 0 ? (
                            <>
                                <div>
                                    <p>
                                        <s>{`${cartItem.product.price.toFixed(2)}€`}</s>
                                    </p>
                                </div>
                                <div style={{ margin: '0 5px 0 5px' }}>
                                    <p>{`${(
                                        cartItem.product.price -
                                        cartItem.product.price * (cartItem.product.sale / 100)
                                    ).toFixed(2)}€`}</p>
                                </div>
                                <label
                                    style={{
                                        border: '1px dashed red',
                                        color: 'red',
                                        padding: '3px',
                                    }}
                                >
                                    {`-${cartItem.product.sale}%`}
                                </label>
                            </>
                        ) : (
                            <>
                                <p>{`${cartItem.product.price.toFixed(2)}€`}</p>
                            </>
                        )}
                    </div>
                    <p>Quantity: {cartItem.quantity}</p>
                </Grid.Column>
            </Grid>
        </Segment>
    );
});
