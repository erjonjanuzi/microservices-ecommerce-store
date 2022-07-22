import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductCard from "../products/ProductCard";

export default observer(function ProductsByRating() {
    const [products, setProducts] = useState<Product[]>([])
    useEffect(() => {
        agent.Products.getProductsByRating().then((result) => {
            setProducts(result);
        })
    }, [])

    return (
        <>
            <h1>🔝Highest rated products</h1>
            <Card.Group itemsPerRow={5}>
                {products.map(product => {
                    return <ProductCard product={product} />;
                })}
            </Card.Group>
        </>
    )
});