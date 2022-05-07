import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../../app/stores/store';
import ProductCard from './ProductCard';

export default observer(function Products() {
    const {
        productStore: { loadProducts, productRegistry, products },
    } = useStore();

    useEffect(() => {
        if (productRegistry.size <= 1) loadProducts();
    }, [productRegistry.size, loadProducts]);

    return (
        <>
            <h1>Products list</h1>
            {products &&
                products.map((product) => {
                    return <ProductCard product={product} />;
                })}
        </>
    );
});
