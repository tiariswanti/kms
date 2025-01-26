"use client";
import React from "react";
import Head from "next/head";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";

export default function Home() {
  return (
    <>
      <Head>
        <title>KMS KNPK</title>
        <meta name="description" content="Knowledge Management System" />
        <meta
          name="keywords"
          content="KMS, Knowledge Management System, KNPK"
        />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="KMS KNPK" />
        <meta
          property="og:description"
          content="Knowledge Management System for KNPK"
        />
        <meta property="og:type" content="website" />
      </Head>

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
