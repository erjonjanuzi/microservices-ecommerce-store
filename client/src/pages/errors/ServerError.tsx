import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../app/stores/store';

export default observer(function ServerError() {

    return (
        <h1>server error</h1>
    )
})