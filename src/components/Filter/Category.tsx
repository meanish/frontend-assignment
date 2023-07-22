import { updateFilterState } from "@/store/slices/productSlices";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";

const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch();

  interface RootState {
    products: {
      allProducts: ProductState[];
      selectedOption: {
        category: string;
      };
    };
  }

  interface ProductState {
    category: string;
  }

  const productIndex = useSelector((state: RootState) => state.products);

  console.log("productIndex", productIndex);

  //getunique Values of category mapping from all the dB
  const getUniqueValue = (
    productIndex: ProductState[],
    field: keyof ProductState
  ) => {
    if (productIndex) {
      let newVal: string[] = ["All"];
      productIndex.forEach((currEle) => {
        if (!newVal.includes(currEle[field])) {
          newVal.push(currEle[field]);
        }
      });
      return newVal;
    }
    return [];
  };

  //For Unique value of category
  const categoryOnlyValue = getUniqueValue(
    productIndex.allProducts,
    "category"
  ); //"category" same as in ApiCall
  console.log(categoryOnlyValue);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  console.log(selectedCategory);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    dispatch(
      updateFilterState({ name: "category", value: event.target.value })
    );
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <p>Category:</p>
        <div className="relative">
          <select
            className="appearance-none p-2 text-blue-500 w-55 hover:text-blue-700 border-gray-200 border-2 add-border-radius bg-white  pl-2 pr-11 rounded-full focus:ring-0 focus:outline-none transition-all duration-300 ease-in-out"
            value={selectedCategory || "All"}
            onChange={handleCategoryChange}
          >
            {categoryOnlyValue.map((category) => (
              <option
                key={category}
                value={category}
                className="hover:bg-green-100 transition-colors"
              >
                {category}
              </option>
            ))}
          </select>
          {selectedCategory && (
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 hover:bg-red-600 text-red-200 rounded-full p-1  border-gray-200 border-2  add-border-radius px-1 py-1 focus:outline-none transition-all duration-300 ease-in-out"
              onClick={handleClearCategory}
            >
              <FaTimes className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
