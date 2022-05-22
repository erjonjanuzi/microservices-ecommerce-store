import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { Product } from '../../app/models/product';
import { useStore } from '../../app/stores/store';
import ProductImageViewer from './ProductImageViewer';

interface Props {
    product: Product;
}

export default observer(function ProductImage({ product }: Props) {
    const {modalStore} = useStore();

    const [selectedImage, setSelectedImage] = useState<string>(product.images[0].url);

    useEffect(() => {}, [selectedImage]);

    if (!product) return <Loader active />;

    return (
        <>
            <div
                style={{
                    width: '100%',
                    height: '600px',
                    textAlign: 'center',
                    verticalAlign: 'center',
                    backgroundColor: 'white',
                    border: '1px solid #4d4f52',
                    cursor: 'pointer',
                }}
                onClick={() => modalStore.openModal(<ProductImageViewer images={product.images} />, 'large', 'white')}
            >
                <img
                    src={selectedImage}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
            >
                {product.images.slice(0, 3).map((image) => {
                    return (
                        <div
                            key={image.url}
                            style={{
                                width: '100px',
                                height: '100px',
                                textAlign: 'center',
                                position: 'relative',
                                border: '1px solid grey',
                            }}
                            onClick={() => setSelectedImage(image.url)}
                        >
                            <img
                                src={image.url}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    verticalAlign: 'middle',
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
});
