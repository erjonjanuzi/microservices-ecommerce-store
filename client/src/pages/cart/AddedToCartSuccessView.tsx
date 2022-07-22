import { observer } from "mobx-react-lite";
import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react";
import { history } from '../..';
import { useStore } from "../../app/stores/store";

interface Props {
    product: {
        title: string,
        images: [{ url: string; isMain?: boolean | undefined; }],
        price: number,
        sale: number,
    }
}

export default observer(function AddedToCartSuccessView({ product }: Props) {
    const { modalStore } = useStore();

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="check" circular color="green" size='big' />
                <Header content="This item has been added to your shopping cart" />
            </div>
            <Segment style={{ margin: '20px 0px' }}>
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
                                src={product.images[0].url}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header><b>{product.title}</b></Header>
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
                                        <p>{`${(
                                            product.price -
                                            product.price * (product.sale / 100)
                                        ).toFixed(2)}€`}</p>
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
                                    <p>{`${product.price.toFixed(2)}€`}</p>
                                </>
                            )}
                        </div>
                    </Grid.Column>
                </Grid>
            </Segment>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Button icon="cart" basic fluid content="View shopping cart" onClick={() => {
                    modalStore.closeModal();
                    history.push('/cart')
                }} />
                <Button fluid secondary content="Keep browsing products" onClick={() => modalStore.closeModal()} />
            </div>
        </>
    )
})