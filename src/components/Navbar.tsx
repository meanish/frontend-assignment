import { RootState } from "@/store";
import Link from "next/link";
import React from "react";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";

const Navbar = () => {
  interface RootState {
    products: {
      favProducts: [];
    };
    addCart: {
      cartProducts: [];
    };
  }
  const cartCount = useSelector(
    (state: RootState) => state.addCart.cartProducts
  );
  const favCount = useSelector(
    (state: RootState) => state.products.favProducts
  );

  return (
    <nav className=" items-center justify-between grid grid-cols-1  px-5 sm:grid-cols-2 lg:grid-cols-12 gap-4  border-gray-200 border-2">
      {/* Logo */}
      <div className="col-span-2 sm:col-span-1 lg:col-span-3 logo p-2 bg-white rounded-lg">
        LogoHere
      </div>
      {/* Search bar */}
      <div className="col-span-5 sm:col-span-3 lg:col-span-6 p-5 bg-white flex items-center hover:dark:bg-neutral-800/30 relative border-l-2 border-r-2 border-gray-200">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 outline-none"
        />
        <button className="p-2 text-blue-500 hover:text-blue-700">
          <FiSearch size={20} />
        </button>
      </div>

      <div className="col-span-5 sm:col-span-8 lg:col-span-3 shop-icons flex items-center justify-end space-x-4">
        {/* Favorite icon bar */}
        <div className="fav-nav relative">
          <Link href="/favourite" as={`/favourite`}>
            <button className="p-2 text-blue-500 hover:text-blue-700 border-gray-200 border-2 add-border-radius px-3 py-2">
              <FiHeart size={20} />
            </button>
          </Link>
          {favCount.length > 0 && (
            <span className="absolute -top-1 -right-1 px-1 py-0 bg-red-500 text-white rounded-full text-xs">
              {favCount.length}
            </span>
          )}
        </div>

        {/* Shopping cart bar */}
        <div className="cart-nav relative">
          <Link href="/cart" as={`/cart`}>
            <button className="p-2 text-blue-500 hover:text-blue-700 border-gray-200 border-2 add-border-radius px-3 py-2">
              <FiShoppingCart size={20} />
            </button>
          </Link>
          {cartCount.length > 0 && (
            <span className="absolute -top-1 -right-1 px-1 py-0 bg-red-500 text-white rounded-full text-xs">
              {cartCount.length}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
