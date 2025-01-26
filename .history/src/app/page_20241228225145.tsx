"use client";
import React, { useState } from "react";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";

export default function Home() {
  return (
    <>
      <div className="flex flex-col mt-24 mx-4 sm:mx-20 items-center">
        <Banner />
      </div>
      <div>
        
        <Recomendation />
      </div>
    </>
  );
}
