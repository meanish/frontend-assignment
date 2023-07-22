import { searchProduct } from "@/store/slices/productSlices";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { RootState } from "@/store";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
const Searchbar = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [buttonText, setButtonText] = useState<string>("Ctrl + K");
  const searchResult = useSelector(
    (state: RootState) => state.products.InputFilter
  );

  //handler for ketyboard events
  useEffect(() => {
    // Add an event listener to listen for Ctrl + K keypress
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setInput(""); // Clear the input field when the Esc key is pressed
        if (searchInputRef.current) {
          searchInputRef.current.blur(); // Move the cursor out of the input field
        }
        setButtonText("Ctrl + K");
      } else if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus(); // Focus on the input element when Ctrl + K is pressed
        }
        setButtonText("Esc");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleCloseButtonClick = () => {
    setInput(""); // Clear the input field when the close button is clicked
    if (searchInputRef.current) {
      searchInputRef.current.blur(); // Move the cursor out of the input field
    }
  };

  const handleInput = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
    dispatch(searchProduct({ input: e.target.value }));
  };
  return (
    <div className="relative  w-full flex">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search..."
        className="w-full p-2 outline-none bg-bg-100"
        value={input}
        onChange={handleInput}
      />
      {input ? (
        <button
          className="text-red-500 p-0 h-6 mt-2 font-bold m-0 border-red-500 border-2 rounded hover:text-red-700"
          onClick={handleCloseButtonClick}
        >
          <IoCloseOutline size={22} />
        </button>
      ) : (
        <button className=" text-blue-500 text-sm  w-20 border-2 border-boder-100 hover:text-blue-700 rounded">
          {buttonText}
        </button>
      )}
      <div className="search-result absolute top-full left-0 max-h-72 overflow-y-auto z-10 bg-boder-100 w-full rounded shadow">
        {input && searchResult && (
          <div className="py-2 text-sm ">
            Found products: {searchResult.length}
          </div>
        )}

        {input &&
          searchResult &&
          searchResult.map((val, index) => {
            return (
              <div className="border-2 pl-2 py-3 mb-1 rounded">
                <Link href="/card/[id]" as={`/card/${val.id}`}>
                  <div
                    key={index}
                    className="product-detail flex gap-4 hover:underline"
                  >
                    {val.category} <span className="font-bold">&gt;</span>
                    <span>
                      <p className="truncate w-44 border font-bold">
                        {val.title}
                      </p>
                    </span>
                    <span className="font-bold">&gt;</span> $ {val.price}
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Searchbar;
