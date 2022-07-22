import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Card, Loader } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    productId: string;
}

export default observer(function SimilarProducts({ productId }: Props) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        agent.Products.getSimilarProducts(productId).then(result => {
            setProducts(result);
            setLoading(false);
        })
    }, [productId])

    return (
        <>
            <h1>Recommended products</h1>
            <Card.Group itemsPerRow={5}>
                {products.map((product) => {
                    return <ProductCard product={product} />;
                })}
            </Card.Group>
        </>
    )
})