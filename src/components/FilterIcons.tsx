import React, { useEffect, useState } from "react";
import CategoryFilter from "./Filter/Category";
import Price from "./Filter/Price";
import { useDispatch, useSelector } from "react-redux";
import { togglePrice, updateProductState } from "@/store/slices/productSlices";
import { Dispatch } from "redux";
import { FaFilter, FaSort } from "react-icons/fa";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

const FilterIcons = () => {
  const [sortOrder, setSortOrder] = useState<string>("asc");
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

  const handlePriceToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    dispatch(togglePrice({ sortOrder }));
  };

  return (
    <div className="p-4 border-l  border-gray-300 flex flex-col items-end mr-4">
      <button
        className="rounded-md transition-opacity p-2 text-blue-500 hover:text-blue-700 border-gray-200 border-2 add-border-radius px-3 py-2"
        onClick={handleFilterToggle}
      >
        <FaFilter />
      </button>
      <div className="relative">
        <div
          className={`absolute bg-gray-200 p-3 right-0 transition-all duration-600 ${
            showFilters ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-4 mt-4 bg-gray-200">
            <div className="category_filter">
              <CategoryFilter />
            </div>
            <div className="price_filter">
              <Price />
            </div>
            <div className="sort_price">
              <button
                className="p-2 bg-blue-500 text-white rounded-md"
                onClick={handlePriceToggle}
              >
                <HiMiniArrowsUpDown />
              </button>
            </div>
            <div className="clear_filters"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterIcons;
