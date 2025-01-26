"use client";
import React, { useEffect } from "react";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";
import Head from "next/head";

export default function Home() {
  return (
    <!DOCTYPE html>
  <html>
      <Head>
        {/* Tambahkan favicon */}
        <link rel="icon" href="/favicon.ico" />
        <title>Your Website Title</title>
        <meta name="KMS KNPK" content="Knowledge Management System" />
      </Head>
      <body>
      <div className="flex flex-col mt-24 mx-4 sm:mx-20 items-center">
        <Banner />
      </div>
      <div className="mb-10">
        <h2 className="text-lg sm:text-xl font-bold mt-6 ml-10 lg:ml-52 text-gray-800">
          Recommendation
        </h2>
        <Recomendation />
      </div>
  </html>

  );
}
