"use client";
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
  };

  // useEffect to save cartProducts to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("addcart", JSON.stringify(cartProducts));
  }, [cartProducts]);


  return (
    <>
      <div className="product container">
        {productDetails && (
          <div className="product-data">
            <h2>{productDetails.title}</h2>
            <div className="category">
              Category: <span>{productDetails.category}</span>
            </div>
            <div className="product-card ">
              <div className="product-img">
                <img src={productDetails.image} alt={productDetails.title} />
              </div>
              <div className="product_description">
                <div className="flex">
                  <div className="title">Description:</div>
                  <p className="description_text">
                    {productDetails.description}
                  </p>
                </div>
                <div className="flex">
                  <div className="title">
                    Rating:{productDetails.rating.rate}
                  </div>
                  {/* <StarRating stars={rating.rate} reviews={rating.count} /> */}
                </div>
                <div className="flex">
                  <div className="title">Price:${productDetails.price}</div>
                  <p className="product-data-price">
                    {/* <FormatPrice price={productDetails.price} /> */}
                  </p>
                </div>
                <div className="add-to-cart">
                  <button onClick={handleAddCart}> Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
