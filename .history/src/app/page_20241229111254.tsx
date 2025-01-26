"use client";
import React, { useState } from "react";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * The homepage of the application.
 *
 * It renders a banner and a list of recommended articles.
 *
 * @returns The component to render.
 */
/******  ba32cb67-951d-4cbf-8ad6-e4c6cf0d1cb8  *******/export default function Home() {
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
