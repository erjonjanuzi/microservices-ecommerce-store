import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useStore } from '../../app/stores/store';
import { Slider } from './Slider';

export default observer(function HomePage() {
    return (
        <>
            <Slider />
        </>
    );
});