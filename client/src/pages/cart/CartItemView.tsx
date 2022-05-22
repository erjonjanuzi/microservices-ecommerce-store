import { observer } from 'mobx-react-lite';
import { Button, Grid } from 'semantic-ui-react';
import { CartItem } from '../../app/models/cart';

interface Props {
    cartItem: CartItem;
}

export default observer(function CartItemView({ cartItem }: Props) {
    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <div
                        style={{
                            width: '100%',
                            height: '100px',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            backgroundColor: 'white',
                            border: '1px solid red'
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
                                        <h5>
                                            <s>{`${cartItem.product.price.toFixed(2)}€`}</s>
                                        </h5>
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
                <Grid.Column width={2} textAlign='right'>
                    <Button icon='close' basic />
                </Grid.Column>
            </Grid>
        </>
    );
});
