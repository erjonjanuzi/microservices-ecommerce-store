import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Image, Label, Segment } from 'semantic-ui-react';
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

    useEffect(() => {
        if (id) loadProduct(id);
    }, [id, loadProduct, clearSelectedProduct]);

    if (loadingInitial || !product) return <LoadingComponent />;

    return (
        <Segment>
            <Grid>
                <Grid.Column width={9}>
                    <ProductImage product={product}/>
                </Grid.Column>
                <Grid.Column width={7}>
                    <h1>{product.title}</h1>
                    <h3>
                        <Label basic content={`${product.quantity} available in stock`} />
                    </h3>
                </Grid.Column>
            </Grid>
        </Segment>
    );
});
