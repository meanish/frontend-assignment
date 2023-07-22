import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    value: 0,
    length: 4,
  },
  reducers: {
    nextSlide(state, action) {
      console.log("action", action);
      console.log("state", state);
      state.value = action.payload > state.length ? 0 : action.payload;
    },
    prevSlide(state, action) {
      console.log("action", action);
      state.value = action.payload < 0 ? state.length : action.payload;
    },
  },
});

// Export the slice and actions
export { sliderSlice };
export const { nextSlide, prevSlide } = sliderSlice.actions;
