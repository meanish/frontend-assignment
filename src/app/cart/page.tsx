"use client";
import { RootState } from "@/store";
import { removeCart, totalPrice } from "@/store/slices/addtocartSlices";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

const Cart = () => {
  const cartData = useSelector((state: RootState) => state.addCart);

  const dispatch = useDispatch<Dispatch<any>>();

  const handleDelete = (val: any) => {
    console.log(val);
    dispatch(removeCart(val));
  };
  return (
    <>
      <div className="cart">
        <h1 className="text-center font-bold text-lg text-red-400 my-5">
          Shopping Cart
        </h1>
      </div>
      <div className="cart-table w-3/5 mx-auto">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="bg-myColor-100">
            {cartData.cartProducts.map((val, index) => {
              const { title, price, image } = val;
              return (
                <tr
                  key={index}
                  className="border-2 border-myColor-200 pl-2 py-4 mb-1 add-border-radius"
                >
                  <td>
                    <img src={image} alt={title} className="w-14 h-14" />
                  </td>
                  <td className="text-md text-blue-500 pl-3">{title}</td>
                  <td className="font-bold text-lg text-green-400">
                    $ {price}
                  </td>
                  <td className="font-bold" onClick={() => handleDelete(val)}>
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="cart-bill bg-purple-300 w-1/4 ml-auto  font-bold text-gray-600 p-3 mb-5">
        <h1 className="text-center font-bold text-lg text-black my-5 border-myColor-50">
          Total Amount
        </h1>
        <p>
          Item Price:{" "}
          <span className="text-green-600">${cartData.totalAmount}</span>
        </p>
        <p>
          Delivery Charge:<span className="text-green-600">$20 </span>
        </p>
        <p>
          Total Cost:{" "}
          <span className="font-bold text-lg text-red-600">
            $ {cartData.totalAmount + 20}
          </span>{" "}
        </p>
      </div>
    </>
  );
};

export default Cart;
