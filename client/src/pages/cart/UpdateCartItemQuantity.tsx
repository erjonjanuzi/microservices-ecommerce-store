import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Divider, Grid, Label, Loader, Segment } from "semantic-ui-react";
import { CartItem } from "../../app/models/cart";
import { useStore } from "../../app/stores/store";
import { toast } from 'react-toastify';

interface Props {
    cartItem: CartItem;
}

export default observer(function UpdateCartItemQuantity({ cartItem }: Props) {
    const { cartStore, drawerStore } = useStore();
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (qty: number) => {
        if (qty < 1) {
            setQuantity(1);
        } else if (qty > cartItem.product?.quantity!) {
            setQuantity(cartItem.product?.quantity!);
        } else {
            setQuantity(qty);
        }
    };

    useEffect(() => {
        setQuantity(cartItem.quantity);
    }, []);

    if (!cartItem) return <Loader active />

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                    <Segment>
                        <div
                            style={{
                                width: '100%',
                                height: '200px',
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
                    </Segment>
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <h2>{cartItem.product.title}</h2>
                    <h3>
                        <Label basic content={`${cartItem.product.quantity} available in stock`} />
                    </h3>
                    <Button.Group style={{ border: '1px solid #f4f4f4' }}>
                        <Button
                            icon="plus"
                            onClick={() => handleQuantityChange(quantity + 1)}
                        />
                        <Button
                            basic
                            disabled
                            content={quantity}
                        />
                        <Button
                            icon="minus"
                            onClick={() => handleQuantityChange(quantity - 1)}
                        />

                    </Button.Group>
                </div>
            </div>
            <Divider />
            <div className="row-flex">
                <Button
                    secondary
                    content="Save"
                    fluid
                    onClick={() => cartStore.updateCartItemQuantity({ productId: cartItem.product.id, quantity }).then(() => {
                        toast.success('Cart item updated');
                        drawerStore.closeDrawer();
                    })}
                />
                <Button
                    content="Cancel"
                    fluid
                    basic
                    onClick={() => drawerStore.closeDrawer()}
                />
            </div>
        </>
    )
})