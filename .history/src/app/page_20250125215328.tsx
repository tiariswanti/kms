"use client";
import React, { useState } from "react";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";


export default function Home() {
  
  return (
    <>
    <head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KMS KNPK</title>

  <meta name="description" content="Knowledge Management" />
  <meta name="KMS KNPK" content="Knowledge Management" />
</head>
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