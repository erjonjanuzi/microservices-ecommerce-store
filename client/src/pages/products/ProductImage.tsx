import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Loader } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProductImageViewer from './ProductImageViewer';

interface Props {
    images: [{
        url: string;
        isMain?: boolean | undefined;
    }];
}

export default observer(function ProductImage({ images }: Props) {
    const { modalStore } = useStore();

    const [selectedImage, setSelectedImage] = useState<string>();
    const [loadingInitial, setLoadingInitial] = useState(true);

    useEffect(() => {
        setSelectedImage(images[0].url);
        setLoadingInitial(false);
    }, [images]);

    if (!images || loadingInitial) return <Loader active />;

    return (
        <>
            <div
                style={{
                    width: '100%',
                    height: '400px',
                    textAlign: 'center',
                    verticalAlign: 'center',
                    backgroundColor: 'white',
                    border: '1px solid #cfcfcf',
                    marginBottom: '10px',
                    cursor: 'pointer',
                }}
                onClick={() => modalStore.openModal(<ProductImageViewer images={images} />, 'large', 'white')}
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
                {images.slice(0, 6).map((image) => {
                    return (
                        <>
                            <div
                                key={image.url}
                                style={{
                                    width: '70px',
                                    margin: '0 3px 0 3px',
                                    height: '70px',
                                    textAlign: 'center',
                                    position: 'relative',
                                    border: '1px solid #cfcfcf',
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
                        </>
                    );
                })}
            </div>
        </>
    );
});
