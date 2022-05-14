import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';

interface Props {
    images: FileList | undefined;
    handleRemoveImages: (index: number) => void
}

export default observer(function ImageRenderer({ images, handleRemoveImages }: Props) {
    const [preview, setPreview] = useState<string[]>();

    const handleRemoveImageRenderer = (index: number) => {
        const objectUrls = preview;
        objectUrls!.splice(index, 1);

        setPreview(objectUrls);

        handleRemoveImages(index)
    };

    useEffect(() => {
        if (!images) {
            setPreview(undefined);
            return;
        }

        const objectUrls: string[] = [];
        for (let i = 0; i < images.length; i++) {
            objectUrls.push(URL.createObjectURL(images[i]));
        }

        setPreview(objectUrls);
    }, [images]);

    return (
        // preview.map((view: any) => <img style={{maxWidth: '200px'}} src={view} />)
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                {preview?.map((view: any, i: number) => {
                    return (
                        <div
                            key={view}
                            style={{
                                marginBottom: '10px',
                                flexBasis: '31%',
                                width: '125px',
                                height: '125px',
                                lineHeight: '115px',
                                textAlign: 'center',
                                position: 'relative',
                                backgroundColor: 'transparent',
                                border: '1px solid #4d4f52',
                            }}
                        >
                            <img
                                src={view}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    verticalAlign: 'middle',
                                }}
                            />
                            <Button
                                style={{ position: 'absolute', right: '0px', top: '-5px' }}
                                negative
                                icon="times"
                                size="tiny"
                                type="button"
                                onClick={() => {
                                    handleRemoveImageRenderer(i);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
});
