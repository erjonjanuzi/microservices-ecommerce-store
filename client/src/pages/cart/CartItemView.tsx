import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Confirm, Grid, Header, Segment } from 'semantic-ui-react';
import { CartItem } from '../../app/models/cart';
import { useStore } from '../../app/stores/store';
import UpdateCartItemQuantity from './UpdateCartItemQuantity';

interface Props {
    cartItem: CartItem;
}

export default observer(function CartItemView({ cartItem }: Props) {
    const { cartStore: { removeProductFromCart }, drawerStore } = useStore();
    const [confirm, setConfirm] = useState(false)

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
                    <Header link as={Link} to={`/products/${cartItem.product.id}`} className='underline-title'><b>{cartItem.product.title}</b></Header>
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
                    <Button size='tiny' content='Edit item' icon='edit outline' basic
                        onClick={() => drawerStore.openDrawer(<UpdateCartItemQuantity cartItem={cartItem}/>, 'Edit cart item', 'white')}
                    />
                </Grid.Column>
                <Grid.Column width={2} textAlign='right'>
                    <Button icon='close' basic
                        onClick={() =>
                            setConfirm(true)
                        }
                    />
                </Grid.Column>
            </Grid>
            <Confirm
                open={confirm}
                content='Are you sure you want to remove product from cart?'
                onCancel={() => setConfirm(false)}
                onConfirm={() => removeProductFromCart(cartItem.product.id).then(() => {
                    setConfirm(false);
                    toast.info("Product removed from cart")
                })}
            />
        </>
    );
});
