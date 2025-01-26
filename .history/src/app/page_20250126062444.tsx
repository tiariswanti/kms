// app/page.tsx
use client;
import React from "react";
import { Metadata } from "next";
import Head from "next/head";
import Recomendation from "./components/Home/Recomendation";
import Banner from "./components/Home/Banner";

export default function Home() {
  const title = "Dynamic SEO Title";
  const description = "This is a dynamic SEO description.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
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
