import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Grid, Loader } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { PaginatedResult } from "../../app/models/pagination";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

export default observer(function ProductSearchScreen() {
    const [products, setProducts] = useState<Product[]>();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const token = location.search.split('=')[1];

        const params = new URLSearchParams();

        params.append('pageNumber', '1');
        params.append('pageSize', '8');
        params.append('search', token);

        agent.Products.all(params).then((result) => {
            setProducts(result.data)
        }).finally(() => setLoading(false))
    }, [location.search])

    return (
        <>
            <h1>Search results for "{location.search.split('=')[1]}"</h1>
            {loading ? <Loader active /> :
                <Card.Group itemsPerRow={5}>
                    {products?.map((product) => {
                        return <ProductCard product={product} />;
                    })}
                </Card.Group>
            }
        </>
    )
})