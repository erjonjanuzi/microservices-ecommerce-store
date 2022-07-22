import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductCard from "../products/ProductCard";

export default observer(function ProductsOnSale() {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        agent.Products.getProductsOnSale().then((result) => {
            setProducts(result);
        })
    }, [])

    return (
        <>
            <h1>🔥Hot Sale</h1>
            <Card.Group itemsPerRow={5}>
                {products.map(product => {
                    return <ProductCard product={product} />;
                })}
            </Card.Group>
        </>
    )
});