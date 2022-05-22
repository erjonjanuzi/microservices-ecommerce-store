import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';

interface Props {
    images: [
        {
            url: string;
        }
    ];
}

export default observer(function ProductImageViewer({ images }: Props) {
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

    if (!images) return <Loader active />;

    return (
        <>
            <Grid>
                <Grid.Column width={2}>
                    <h1 onClick={() => handleImageChange(currentIndex - 1)}>{'<-'}</h1>
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
                <Grid.Column width={2}>
                    <h1 onClick={() => handleImageChange(currentIndex + 1)}>{'->'}</h1>
                </Grid.Column>
            </Grid>
        </>
    );
});
