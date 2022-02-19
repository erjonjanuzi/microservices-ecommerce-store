import { Component } from "react";
import { Carousel } from "react-responsive-carousel";

export class Slider extends Component {
    render() {
        return (
            <Carousel
                autoPlay
                emulateTouch
                infiniteLoop
                showArrows={false}
                showStatus={false}
                useKeyboardArrows
                showIndicators={false}
                showThumbs={false}
                interval={5000}
                className='slider'
            >
                <div>
                    <img src="assets/slider/ps5-slider.png" />
                </div>
                <div>
                    <img src="assets/slider/macbook-slider.png" />
                </div>
                <div>
                    <img src="assets/slider/xbox-slider.png" />
                </div>
            </Carousel>
        );
    }
}
