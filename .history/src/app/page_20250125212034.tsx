"use client";
import React, { useState } from "react";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";

export async function generateMetadata() {
  return {
    title: "KMS KNPK",
    description:
      "Temukan berbagai mobil bekas dan baru yang dijual dengan harga terbaik di website kami.",
  };
}
export default function Home() {
  return (
    <>
      <div className="flex flex-col mt-24 mx-4 sm:mx-20 items-center">
        <Banner />
      </div>
      <div className="mb-10">
        <h2 className="text-lg sm:text-xl font-bold mt-6 ml-10 lg:ml-52 text-gray-800">
          Recommendation
        </h2>
        <Recomendation />
      </div>
    </>
  );
}
