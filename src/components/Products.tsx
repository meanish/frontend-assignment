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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 rounded-lg p-4">
      {productIndex.loading && <div>Loading...........</div>}
      {!productIndex.loading && productIndex.error && (
        <div>Error in fetching...........</div>
      )}
      {!productIndex.loading &&
        productIndex.filteredProducts.map((val, index) => {
          return (
            <div key={val.id} className="relative">
              <Link
                href="/card/[id]"
                as={`/card/${val.id}`}
                className={`p-2 text-blue-500 grid items-center bg-gray-80 border-gray-300 border-2 add-border-radius px-3 py-2 group overflow-hidden transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg relative`}
              >
                <div key={val.id}>
                  <div className="title"></div>
                  <div className="image">
                    <img src={val.image} alt={val.title} />
                  </div>
                </div>
              </Link>

              <div className="add-to-fav group-hover:block absolute p-2 top-2 right-2 z-999">
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
                    <AiOutlineHeart style={{ fontSize: "30px" }} />
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
