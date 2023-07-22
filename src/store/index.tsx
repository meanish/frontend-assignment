import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlices";
import { sliderSlice } from "./slices/sliderSlices";
import { addCartSlice } from "./slices/addtocartSlices";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    slider: sliderSlice.reducer,
    addCart: addCartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
