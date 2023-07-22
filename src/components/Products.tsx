import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { favProduct } from "@/store/slices/productSlices";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RootState {
  products: {
    allProducts: ProductState[];
    filteredProducts: ProductState[];
    loading: boolean;
    error: string;
    favProducts: ProductState[];
  };
}
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
  isFavorite: Boolean;
}

const Products = () => {
  const showSnackbar = (message: any) => {
    toast.info(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      style: {
        background: "#dbe3db",
        color: "#ff0000",
      },
    });
  };

  const productIndex = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch();

  const handleFav = (product: any) => {
    dispatch(favProduct({ val: product }));
    const message = product.isFavorite
      ? "Removed from Favorites"
      : "Added to Favorites";
    showSnackbar(message);
  };

  useEffect(() => {
    localStorage.setItem(
      "favProducts",
      JSON.stringify(productIndex.favProducts)
    );
    localStorage.setItem(
      "Productfav",
      JSON.stringify(productIndex.filteredProducts)
    );
  }, [productIndex.favProducts]);

  return (
    <div className="grid mx-28 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 rounded-lg p-4">
      {productIndex.loading && <div>Loading...........</div>}
      {!productIndex.loading && productIndex.error && (
        <div>Error in fetching...........</div>
      )}
      {!productIndex.loading &&
        productIndex.filteredProducts.map((val, index) => {
          return (
            <div key={val.id} className="relative group h-96 ">
              <Link
                href="/card/[id]"
                as={`/card/${val.id}`}
                className="col-span-1 text-blue-500 bg-white h-full grid items-end bg-boder-50 border-boder-200 border-2 add-border-radius group overflow-hidden transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg relative"
              >
                <div
                  key={val.id}
                  className="flex px-1 pt-4 mt-3 h-full gap-4 justify-between"
                >
                  <div className="title text-md font-bold text-myColor-50 leading-tight w-2/3">
                    {val.title}
                  </div>
                  <div className="price font-bold text-lg text-green-400  w-1/3">
                    $ {val.price}
                  </div>
                </div>
                <div className="image flex justify-center">
                  <img
                    src={val.image}
                    alt={val.title}
                    className="h-150 w-200"
                  />
                </div>
              </Link>
              <div className="before absolute inset-0 bg-black bg-opacity-20 opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
              <div className="add-to-fav hidden group-hover:block absolute top-1 right-2 transition-opacity duration-400">
                <button
                  onClick={(e) => {
                    handleFav(val);
                  }}
                >
                  {val.isFavorite ? (
                    <AiFillHeart
                      color="red"
                      style={{
                        fontSize: "30px",
                        border: "2px solid green",
                        borderRadius: "50%",
                        padding: "1px",
                      }}
                    />
                  ) : (
                    <AiOutlineHeart color="red" style={{ fontSize: "30px" }} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      <ToastContainer />
    </div>
  );
};

export default Products;
