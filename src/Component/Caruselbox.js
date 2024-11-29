import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import forest from '../asserts/forest.png';
import baba from '../asserts/baba.png';

export default class Caruselbox extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src={ forest } 
                        alt="forest" 

                    />
                    <Carousel.Caption>
                        <h3>Forest Image</h3>
                        <p>Govno penis sraka</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img 
                        className="d-block w-100"
                        src={ baba } 
                        alt="forest" 

                    />
                    <Carousel.Caption>
                        <h3>Forest Image</h3>
                        <p>Govno penis sraka</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}