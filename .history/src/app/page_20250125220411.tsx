"use client";
import React from "react";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";
import Head from "next/head";

export const metadata = {
  title: "Home - KMS KNPK",
  description: "Knowledge Management System for KMS KNPK",
  keywords: "KMS, Knowledge Management System, KNPK",
  author: "Your Name",
  openGraph: {
    title: "KMS KNPK - Knowledge Management System",
    description: "A robust Knowledge Management System for KNPK",
    type: "website",
  },
};

export default function Home() {
  const metadata = {
    name: "KMS KNPK",
    description: "Knowledge Management System",
  };
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
