import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';

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
        return () => clearSelectedProduct();
    }, [id, loadProduct, clearSelectedProduct]);

    if (loadingInitial || !product) return <LoadingComponent />;

    return (
        <Segment placeholder>
            <h1>{product.title}</h1>
            <h1>{product.category}</h1>
            <h1>{product.description}</h1>
            <h1>{product.price}</h1>
            <h1>{product.quantity}</h1>
            <h1>{product.rating}</h1>
            <h1>{product.sale}</h1>
            <Button content="Add to cart" onClick={() => cartStore.addProductToCart(product.id, 1)}/>
        </Segment>
    );
});
