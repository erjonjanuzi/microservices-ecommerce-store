import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductCard from "../products/ProductCard";

export default observer(function PromotedProducts() {
    const [promotedProducts, setPromotedProducts] = useState<Product[]>([])
    useEffect(() => {
        agent.Products.getPromotedProducts().then((result) => {
            setPromotedProducts(result);
        })
    }, [])

    return (
        <>
            <h1>💫Promoted products</h1>
            <Card.Group itemsPerRow={5}>
                {promotedProducts.map(product => {
                    return <ProductCard product={product} />;
                })}
            </Card.Group>
        </>
    )
});