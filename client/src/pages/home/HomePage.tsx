import { observer } from 'mobx-react-lite';
import React, { Component, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useStore } from '../../app/stores/store';
import LoginForm from '../login/LoginForm';
import { Slider } from './Slider';

export default observer(function HomePage() {
    return (
        <>
            <Slider />
        </>
    );
});