"use client";
import { RootState } from "@/store";
import { totalPrice } from "@/store/slices/addtocartSlices";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

const Cart = () => {
  const cartData = useSelector((state: RootState) => state.addCart);

  const dispatch = useDispatch<Dispatch<any>>();

  return (
    <>
      <div className="cart-table">
        {cartData.cartProducts.map((val, index) => {
          const { title, price } = val;
          return (
            <div className="flex">
              Title:{title}
              Price:{price}
            </div>
          );
        })}
      </div>
      <div className="cart-bill">
        <h1>Bill-amount</h1>
        <p>Item Price: ${cartData.totalAmount} </p>
        <p>Delivery Charge:$20 </p>
        <p>TOtal Cost: $ {cartData.totalAmount + 20} </p>
      </div>
    </>
  );
};

export default Cart;
