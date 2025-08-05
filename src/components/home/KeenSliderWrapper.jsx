import React from "react";
import { useKeenSlider } from "keen-slider/react";

const KeenSliderWrapper = ({ children, perView = 3, spacing = 15 }) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView,
      spacing,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 2 },
      },
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {React.Children.map(children, (child, index) => (
        <div className="keen-slider__slide" key={index}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default KeenSliderWrapper;
