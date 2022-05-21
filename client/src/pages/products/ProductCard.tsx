import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Icon, Image, Label, Rating } from 'semantic-ui-react';
import { Product } from '../../app/models/product';

const difference = (date1: Date, date2: Date) => {
    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day;
};

interface Props {
    product: Product;
}

export default observer(function ProductCard({ product }: Props) {
    return (
        <Card className='product-card'>
            <Image
                link
                as={Link}
                to={`/products/${product.id}`}
                src={product.images[0].url}
                wrapped
                ui={false}
            />
            <Card.Content>
                {difference(new Date(product.createdAt), new Date()) <= 7 && (
                    <Card.Meta style={{ marginBottom: '10px' }}>
                        <Label basic color="green" content="New" size="tiny" />
                    </Card.Meta>
                )}
                <Card.Header link as={Link} to={`/products/${product.id}`} className='underline-title'>
                    {product.title}
                </Card.Header>
                <Card.Meta>{product.category}</Card.Meta>
                <Card.Description>
                    {product.rating ? (
                        <>
                            <Rating
                                defaultRating={Math.round(4.12121 * 10) / 10}
                                maxRating={5}
                                disabled
                            />
                        </>
                    ) : (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                }}
                            >
                                <Rating defaultRating={0} maxRating={5} disabled />
                                <p style={{ marginLeft: '5px' }}>(No ratings yet)</p>
                            </div>
                        </>
                    )}

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            color: 'black',
                        }}
                    >
                        {product.sale > 0 ? (
                            <>
                                <div>
                                    <h5>
                                        <s>{`${product.price.toFixed(2)}€`}</s>
                                    </h5>
                                </div>
                                <div style={{ margin: '0 5px 0 5px' }}>
                                    <h2>{`${(
                                        product.price -
                                        product.price * (product.sale / 100)
                                    ).toFixed(2)}€`}</h2>
                                </div>
                                <label
                                    style={{
                                        border: '1px dashed red',
                                        color: 'red',
                                        padding: '3px',
                                    }}
                                >
                                    {`-${product.sale}%`}
                                </label>
                            </>
                        ) : (
                            <>
                                <h2>{`${product.price.toFixed(2)}€`}</h2>
                            </>
                        )}
                        <Icon
                            style={{ marginLeft: 'auto' }}
                            name="heart outline"
                            size="large"
                            onClick={() =>
                                toast.success('The product has been added to your wishlist')
                            }
                            link
                        />
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    );
});
