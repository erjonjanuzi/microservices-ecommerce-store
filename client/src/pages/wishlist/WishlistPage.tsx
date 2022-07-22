import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Card, Icon, Loader } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProductCard from "../products/ProductCard";

export default observer(function WishlistPage() {
    const { wishlistStore } = useStore();

    useEffect(() => {
        wishlistStore.getWishlist();
        wishlistStore.getWishlistProducts();
    }, [])

    if (!wishlistStore.products) return <div style={{ minHeight: '100vh', marginTop: '50px' }}>
        <Loader active />
    </div>

    return (
        <>
            <div style={{ minHeight: '100vh', marginTop: '50px' }}>
                {wishlistStore.wishlist?.products.length === 0 ?
                    <h1>No products in wishlist</h1>
                    :
                    <>
                        <h1><Icon color="red" name="heart" />My wishlist</h1>
                        <Button content='Clear wishlist' basic onClick={() => wishlistStore.clearWishlist()} />
                        <Card.Group itemsPerRow={4}>
                            {wishlistStore.products.map((item) => {
                                return <ProductCard product={item} />
                            })}
                        </Card.Group>
                    </>
                }
            </div>
        </>
    );
})
