import { observer } from "mobx-react-lite";
import { Card } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProductCard from "./ProductCard";

export default observer(function ProductList() {
    const { productStore: { products } } = useStore();

    return (
        <>
            <Card.Group itemsPerRow={4}>
                {products.map((product) => {
                        return <ProductCard product={product} />;
                    })}
            </Card.Group>
        </>
    )
})