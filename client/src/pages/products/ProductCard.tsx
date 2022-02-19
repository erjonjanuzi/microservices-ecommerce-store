import { observer } from 'mobx-react-lite';
import React from 'react';
import { toast } from 'react-toastify';
import {
    Button,
    Card,
    Divider,
    Icon,
    Image,
    Label,
    Rating,
} from 'semantic-ui-react';

export default observer(function ProductCard() {
    return (
        <Card link>
            <Image
                src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000"
                wrapped
                ui={false}
            />
            <Card.Content>
                <Card.Header>iPhone 13 Pro Max 256GB</Card.Header>
                <Card.Meta>Phones</Card.Meta>
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
                            <h2>750$</h2>
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
                            onClick={() => toast.success('The product has been added to your wishlist')}
                        />
                        {/* </Button> */}
                    </div>
                </Card.Description>
            </Card.Content>
        </Card>
    );
});
