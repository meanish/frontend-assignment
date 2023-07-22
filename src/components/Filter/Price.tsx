import { togglePrice, updateFilterState } from "@/store/slices/productSlices";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { HiMiniArrowsUpDown } from "react-icons/hi2";

const Price = () => {
  const dispatch = useDispatch();

  const priceRange = ["All", 20, 50, 60, 100, 200, 500, 1000];
  const [sortOrder, setSortOrder] = useState<string>("asc");
  interface RootState {
    products: {
      allProducts: ProductState[];
      selectedOption: {
        price: number;
      };
    };
  }

  interface ProductState {
    price: number;
  }

  const productIndex = useSelector((state: RootState) => state.products);

  const [selectedPrice, setSelectedPrice] = useState<any | null>(null);

  console.log(typeof selectedPrice);

  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrice(event.target.value);
    if (selectedPrice === "All") {
      dispatch(updateFilterState({ name: "price", value: "" }));
    } else {
      dispatch(updateFilterState({ name: "price", value: event.target.value }));
    }
  };

  const handleClearPrice = () => {
    setSelectedPrice(null);
    dispatch(updateFilterState({ name: "price", value: "" }));
  };

  const handlePriceToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    dispatch(togglePrice({ sortOrder }));
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <p>Price:</p>
        <div className="choose">
          <select
            className="appearance-none p-2 text-blue-500  hover:text-blue-700 border-boder-200 border-2 add-border-radius bg-white  pl-2 pr-11 rounded-full focus:ring-0 focus:outline-none transition-all duration-300 ease-in-out"
            value={selectedPrice || "All"}
            onChange={handlePriceChange}
          >
            {priceRange.map((price) => (
              <option
                key={price}
                value={price}
                className="hover:bg-green-100 transition-colors"
              >
                {price === "All" ? <>All</> : <>less than ${price}</>}
              </option>
            ))}
          </select>
        </div>

        <div className="close relative">
          {selectedPrice && (
            <button
              className="absolute right-3 -top-3 hover:bg-red-600 text-red-200 rounded-full p-1 border-boder-200 border-2 add-border-radius focus:outline-none transition-all duration-300 ease-in-out"
              onClick={handleClearPrice}
            >
              <FaTimes className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="sort_price">
          <button
            className="p-2 text-myColor-50 border-myColor-700 add-border-radius px-3 py-2 rounded-md"
            onClick={handlePriceToggle}
          >
            <HiMiniArrowsUpDown />
          </button>
        </div>
      </div>
    </>
  );
};

export default Price;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
