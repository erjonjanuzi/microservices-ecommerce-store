import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Card,
    Icon,
    Image,
    Rating,
} from 'semantic-ui-react';
import { Product } from '../../app/models/product';

interface Props {
    product: Product;
}

export default observer(function ProductCard({ product }: Props) {
    return (
        <Card link as={Link} to={`/products/${product.id}`}>
            <Image
                src={product.images[0].url}
                wrapped
                ui={false}
            />
            <Card.Content>
                <Card.Header>{product.title}</Card.Header>
                <Card.Meta>{product.category}</Card.Meta>
                <Card.Description>
                    <Rating defaultRating={4} maxRating={5} disabled />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: 'black',
                        }}
                    >
                        <div>
                            <h5>
                                <s>$1450</s>
                            </h5>
                        </div>
                        <div style={{ margin: '0 5px 0 5px' }}>
                            <h2>{`${product.price}€`}</h2>
                        </div>
                        <label
                            style={{
                                border: '1px dashed red',
                                color: 'red',
                                padding: '3px',
                            }}
                        >
                            -15%
                        </label>
                        {/* <Button style={{marginLeft: 'auto'}} basic icon> */}
                        <Icon
                            style={{ marginLeft: 'auto' }}
                            name="heart outline"
                            size="large"
                            onClick={() =>
                                toast.success(
                                    'The product has been added to your wishlist'
                                )
                            }
                        />
                        {/* </Button> */}
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    );
});
