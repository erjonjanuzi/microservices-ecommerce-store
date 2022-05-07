import { observer } from 'mobx-react-lite';
import { Slider } from './Slider';

export default observer(function HomePage() {
    return (
        <>
            <Slider />
        </>
    );
});