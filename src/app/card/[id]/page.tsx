"use client";
import Rating from "@/components/Helper/Rating";
import Navbar from "@/components/Navbar";
import { RootState } from "@/store";
import {
  addToCart,
  getsingleProduct,
  totalPrice,
} from "@/store/slices/addtocartSlices";
import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Params {
  params: {
    id: number;
  };
}

const page: FC<Params> = ({ params }) => {
  const dispatch: ThunkDispatch<RootState, any, any> = useDispatch();

  const productDetails = useSelector(
    (state: RootState) => state.addCart.singleProducts
  );
  const cartProducts = useSelector(
    (state: RootState) => state.addCart.cartProducts
  );
  const cartState = useSelector((state: RootState) => state.addCart);

  useEffect(() => {
    //to call api for single product
    dispatch(getsingleProduct(params.id));
  }, [dispatch, params.id]);

  const handleAddCart = () => {
    dispatch(addToCart(productDetails));
    dispatch(totalPrice(cartProducts));
    const message = "Added to the Cart";
    showSnackbar(message);
  };

  // useEffect to save cartProducts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("addcart", JSON.stringify(cartProducts));
  }, [cartProducts]);

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

  return (
    <>
      <Navbar />
      <div className="product container mt-12 justify-center">
        {productDetails && (
          <>
            <div className="category ml-2">
              Category:
              <span className="underline ml-3 text-lg font-bold capitalize">
                {productDetails.category}
              </span>
            </div>
            <h2 className="text-center my-2 font-bold text-lg text-blue-600">
              {productDetails.title}
            </h2>
            <div className="product-card bg-boder-100 flex  w-1/2 mx-auto border-2">
              <div className="product-img w-1/2">
                <img
                  src={productDetails.image}
                  alt={productDetails.title}
                  className="h-full"
                />
              </div>
              <div className="product_description w-1/2 flex flex-col justify-center text-sm p-2">
                <p className="description_text text-lg font-bold text-myColor-400 my-3">
                  {productDetails.description}
                </p>

                <div className="title flex my-3 text-myColor-400 ">
                  <span className="font-bold mr-2">Rating:</span>
                  <Rating stars={productDetails.rating.rate} />({" "}
                  {productDetails.rating.count} reviews)
                </div>
                {/* <StarRating stars={rating.rate} reviews={rating.count} /> */}
                <div className="title my-3 text-myColor-400 ">
                  <span className="font-bold mr-2">Price:</span>
                  <span className="font-bold text-lg text-green-400">
                    $ {productDetails.price}
                  </span>
                </div>
                <div className="add-to-cart my-10">
                  <button
                    onClick={handleAddCart}
                    className="border-2 py-2 border-myColor-400 w-full rounded font-bold hover:text-myColor-600 hover:border-0 hover:bg-blue-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <ToastContainer />
          </>
        )}
      </div>
    </>
  );
};

export default page;
