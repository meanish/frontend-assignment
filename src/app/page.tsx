"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/Navbar"; // Replace with the correct path to your productSlice
import Slider from "@/components/Slider";
import { getProducts } from "@/store/slices/productSlices";
import { Dispatch } from "redux";
import Products from "@/components/Products";
import FilterIcons from "@/components/FilterIcons";

const Home = () => {
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    // Dispatch the getProducts async thunk when the component mounts (website is loaded)
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Navbar />
      <FilterIcons />
      <Products />
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  return {
    props: {}, // Set props to an empty object to prevent pre-rendering
  };
};
