import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Divider, Grid, Header, Icon, Loader } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

interface Props {
    images: [
        {
            url: string;
        }
    ];
}

export default observer(function ProductImageViewer({ images }: Props) {
    const {productStore: {selectedProduct}} = useStore();

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageChange = (index: number) => {
        if (index === images.length) {
            setCurrentIndex(0)
        } else if (index < 0){
            setCurrentIndex(images.length - 1)
        } else {
            setCurrentIndex(index)
        }
    }

    useEffect(() => {}, [currentIndex]);

    if (!images || !selectedProduct) return <Loader active />;

    return (
        <>
            <Header as='h1' content={selectedProduct?.title} textAlign='center' />
            <Divider />
            <Grid>
                <Grid.Column width={2} verticalAlign='middle' textAlign='left'>
                    <Icon name='arrow left' link onClick={() => handleImageChange(currentIndex - 1)} size='big' />
                </Grid.Column>
                <Grid.Column width={12}>
                    <div
                        style={{
                            width: '100%',
                            height: '600px',
                            textAlign: 'center',
                            verticalAlign: 'center',
                            backgroundColor: 'white',
                        }}
                    >
                        <img
                            src={images[currentIndex].url}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                            }}
                        />
                    </div>
                </Grid.Column>
                <Grid.Column width={2} verticalAlign='middle' textAlign='right'>
                    <Icon name='arrow right' link onClick={() => handleImageChange(currentIndex + 1)} size='big' />
                </Grid.Column>
            </Grid>
            <Divider />
            <div style={{textAlign: 'center'}}>
                <p>Image {currentIndex + 1} of {images.length}</p>
            </div>
        </>
    );
});
