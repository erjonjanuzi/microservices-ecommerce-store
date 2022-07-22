import { observer } from 'mobx-react-lite';
import ProductsByRating from './ProductsByRating';
import ProductsOnSale from './ProductsOnSale';
import PromotedProducts from './PromotedProducts';
import { Slider } from './Slider';

export default observer(function HomePage() {
    return (
        <>
            <Slider />
            <ProductsOnSale />
            <PromotedProducts />
            <ProductsByRating />
        </>
    );
});