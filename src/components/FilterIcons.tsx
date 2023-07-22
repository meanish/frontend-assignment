import React, { useEffect, useState } from "react";
import CategoryFilter from "./Filter/Category";
import Price from "./Filter/Price";
import { useDispatch, useSelector } from "react-redux";
import { togglePrice, updateProductState } from "@/store/slices/productSlices";
import { Dispatch } from "redux";
import { FaFilter, FaSort } from "react-icons/fa";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

const FilterIcons = () => {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  interface RootState {
    products: {
      selectedOption: {
        category: string;
        price: number;
      };
    };
  }

  //when ever the filter value chnages dispatch to change product list
  const dispatch = useDispatch<Dispatch<any>>();

  const selectedOption = useSelector(
    (state: RootState) => state.products.selectedOption
  );

  useEffect(() => {
    // Dispatch the new reducer here, for example:
    dispatch(updateProductState(selectedOption));
  }, [selectedOption]);

  return (
    <div className="p-4 border-l border-boder-300 flex flex-col items-end">
      <button
        className="rounded-md transition-opacity text-myColor-50 hover:text-blue-700 border-boder-200 border-2 add-border-radius px-3 py-2"
        onClick={handleFilterToggle}
      >
        <FaFilter />
      </button>
      <div className="relative p-4 z-10">
        <div
          className={`absolute right-0  -top-2 transition-all duration-600 ${
            showFilters ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-4 mt-4 p-4 bg-myColor-100 rounded">
            <div className="category_filter">
              <CategoryFilter />
            </div>
            <div className="price_filter">
              <Price />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterIcons;
