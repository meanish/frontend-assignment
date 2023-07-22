import { nextSlide, prevSlide } from "@/store/slices/sliderSlices";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

interface RootState {
  slider: {
    value: number;
  };
}

const Slider = () => {
  const dispatch = useDispatch();

  const slideIndex = useSelector((state: RootState) => state.slider.value);

  console.log("slideIndex", slideIndex);
  return (
    <>
      <div className="slider-events">
        <button onClick={() => dispatch(prevSlide(slideIndex - 1))}>
          prev
        </button>
        <button onClick={() => dispatch(nextSlide(slideIndex + 1))}>
          next
        </button>
      </div>
    </>
  );
};

export default Slider;
