"use client";
import React, { useEffect } from "react";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";
import Head from "next/head";

export default function Home() {
  useEffect(() => {
    // Set the document title
    document.title = "KMS KNPK";

    // Set a custom meta tag for KMS KNPK
    const metaKMS = document.querySelector('meta[name="KMS KNPK"]');
    if (metaKMS) {
      metaKMS.setAttribute("content", "Knowledge Management System");
    } else {
      const meta = document.createElement("meta");
      meta.name = "KMS KNPK";
      meta.content = "Knowledge Management System";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <html lang="en">
      <Head>
        <title>Dynamic Metadata Example</title>
        <meta name="description" content="This is a dynamic metadata example." />
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
    <html/>
    </>
  );
}
