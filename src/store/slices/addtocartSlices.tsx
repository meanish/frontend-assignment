"use client";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";

interface ProductState {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const getlocalValue = () => {
  if (typeof window !== "undefined") {
    const localValue = localStorage.getItem("addcart");
    const parsedValue = localValue ? JSON.parse(localValue) : [];
    return parsedValue;
  }
};

const getTotal = () => {
  if (typeof window !== "undefined") {
    const localValue = localStorage.getItem("totalprice");
    const parsedValue = localValue ? JSON.parse(localValue) : 0;
    return parsedValue;
  }
};

// Define the initial state
const initialState: {
  singleProducts: ProductState | null;
  loading: boolean;
  error: string | null;
  cartProducts: ProductState[];
  totalAmount: number;
} = {
  singleProducts: null,
  loading: false,
  error: null,
  cartProducts: getlocalValue(),
  totalAmount: getTotal(),
};

export const getsingleProduct = createAsyncThunk(
  "getsingleprod",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      return response.data as ProductState;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create a slice using createSlice function
const addCartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    //state updates when changes in filteration
    addToCart: (state, action) => {
      const newItem = action.payload;
      state.cartProducts.push(newItem);
    },
    removeCart: (state, action) => {
      const Item = action.payload;
      const filterItems = state.cartProducts.filter((val) => {
        return val.id !== Item.id;
      });
      state.cartProducts = filterItems;
    },

    totalPrice: (state, action) => {
      const items = action.payload;
      let updateCart = items.reduce((initialValue: number, currVal: any) => {
        return initialValue + currVal.price;
      }, 0);
      localStorage.setItem("totalprice", JSON.stringify(updateCart));
      state.totalAmount = updateCart;
    },
  },

  //for api fetch when components renders
  extraReducers: (builder) => {
    builder
      .addCase(getsingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getsingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProducts = action.payload; // Store the data of single product
      })
      .addCase(getsingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the slice and actions
export { addCartSlice };
export const { addToCart, totalPrice, removeCart } = addCartSlice.actions;
