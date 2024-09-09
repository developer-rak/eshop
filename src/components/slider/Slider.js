import React, { useState } from 'react';
import "./Slider.scss";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { sliderData } from './slider-data';

const Slider = () => {
   const [currentSlide, setCurrentSlide] = useState(0);
   const sliderLength = sliderData.length;
   console.log(sliderLength)

   const nextSlide = () => {
      setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1)
   }

   const preSlide = () => {
      setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1)
   }

  return (
    <div className='slider'>
      <AiOutlineArrowLeft className='arrow prev' onClick={preSlide} />
      <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />

      {sliderData.map((slide, index) => {
         const {image, heading, desc} = slide;

         return (
            <div 
               key={index} 
               className={index === currentSlide ? "slide current" : "slide"}
            >
               {index === currentSlide && (
                  <>
                     <img src={image} alt='slideImg' />
                     <div className="content">
                        <h2>{heading}</h2>
                        <p>{desc}</p>
                        <hr />
                        <a href="##" className='--btn --btn-primary'>
                           Shop Now
                        </a>
                     </div>
                  </>
               )}
            </div>
         )
      })}
    </div>
  )
}

export default Slider;