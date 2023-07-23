import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";

export const getProducts = createAsyncThunk(
  "getprod",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const productData: ProductState[] = response.data.map((product: any) => ({
        ...product,
        isFavorite: false, // Set the initial isFavorite value to false for each product
      }));
      return productData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getlocalProducts = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const localValue = localStorage.getItem("favProducts");
    const parsedValue = localValue ? JSON.parse(localValue) : [];
    return parsedValue;
  }
};

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
  isFavorite: boolean;
}

// Define the initial state
const initialState: {
  allProducts: ProductState[];
  loading: boolean;
  error: string | null;
  filteredProducts: ProductState[];
  InputFilter: ProductState[];
  favProducts: ProductState[];
  selectedOption: {
    category: string;
    price: number;
  };
} = {
  allProducts: [], // Will store the fetched products
  loading: false,
  error: null,
  filteredProducts: [], // Will store the filtered products
  InputFilter: [],
  favProducts: getlocalProducts(),
  selectedOption: {
    category: "",
    price: 0,
  },
};

// Create a slice using createSlice function
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      const { input } = action.payload;
      console.log("What input", input);
      let { allProducts } = state;
      let tempProducts = [...allProducts];

      if (input) {
        tempProducts = tempProducts.filter((currEle) => {
          const lowerCaseVal = input.toLowerCase();
          const lowerCaseTitle = currEle.title.toLowerCase();
          const lowerCaseCategory = currEle.category.toLowerCase(); //case sensitive

          return (
            lowerCaseTitle.includes(lowerCaseVal) ||
            lowerCaseCategory.includes(lowerCaseVal)
          );
        });
      }

      state.InputFilter = tempProducts;
    },
    //state updates when changes in filteration
    updateFilterState: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const { name, value } = action.payload; //category : men's clothing
      state.selectedOption = {
        ...state.selectedOption,
        [name]: name === "price" ? parseFloat(value) : value,
      };
    },

    //dispatch to update the state on chnage in filter values
    updateProductState: (state, action) => {
      let replProducts = state.allProducts.slice();

      const { category, price } = state.selectedOption;
      console.log("tempProduct", replProducts);

      if (category && category !== "All") {
        replProducts = replProducts.filter(
          (currEle) => currEle.category === category
        );
      }

      if (price && price !== 0) {
        replProducts = replProducts.filter((currEle) => currEle.price <= price);
      }

      // Update state.filteredProducts based on the filtering
      state.filteredProducts = replProducts;
    },

    //toggle product with price
    togglePrice: (state, action) => {
      const { sortOrder } = action.payload;
      let replProducts = state.filteredProducts.slice();
      console.log("what is here", sortOrder);
      const sortProduct = replProducts.sort(
        (a: ProductState, b: ProductState) => {
          if (sortOrder === "asc") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        }
      );
      state.filteredProducts = sortProduct;
    },

    favProduct: (state, action) => {
      const { val } = action.payload;
      const product = state.filteredProducts.find((p) => p.id === val.id);

      if (product) {
        product.isFavorite = !val.isFavorite; // Toggle the isFavorite value
        if (product.isFavorite) {
          state.favProducts.push(product); // Add to favProducts if it's marked as favorite
        } else {
          state.favProducts = state.favProducts.filter(
            (p) => p.id !== product.id
          ); // Remove from favProducts if it's unmarked
        }
      }
    },
  },

  //for api fetch when components renders
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload; // Store the fetched products in the 'products' array
        state.filteredProducts = action.payload; // Also set the filtered products to the fetched products initially
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the slice and actions
export { productSlice };
export const {
  searchProduct,
  updateFilterState,
  updateProductState,
  togglePrice,
  favProduct,
} = productSlice.actions;
