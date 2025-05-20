import React, { useState, useEffect } from 'react';
import Slider from "react-animated-slider";
import data from './sliderData.js';
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import './styles/slider-animation.css';
import './styles/styles.css';

const SliderComponent = () => {
    const [slider, setSlider] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        setSlider(data);
        
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getTitleSize = () => {
        if (windowWidth < 480) return '2rem';
        if (windowWidth < 768) return '2.5rem';
        return '4rem';
    };

    return (
        <div className="slider-container" style={{ marginTop: '80px' }}>
            <Slider 
                className="slider-wrapper"
                autoplay={4000}
                infinite
                touchDisabled={windowWidth < 768 ? false : true}
            >
                {slider.map((item, index) => (
                    <div
                        key={index}
                        className="slider-content"
                        style={{ 
                            background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('${item.image}') no-repeat center center`, 
                            backgroundSize: 'cover'
                        }}
                    >
                        <div className="inner">
                            <h1 style={{ fontSize: getTitleSize() }}>{item.title}</h1>
                            <p>{item.description} <br />- {item.tag.toLowerCase()}</p>
                            {item.buttonText && (
                                <button 
                                    className="slider-button"
                                    onClick={() => window.location.href = item.buttonLink || '#'}
                                >
                                    {item.buttonText}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;