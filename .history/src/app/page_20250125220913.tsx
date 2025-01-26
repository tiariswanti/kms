"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head"; // Import Head component
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";

export default function Home() {
  const [metadata, setMetadata] = useState({
    title: "KMS KNPK",
    description: "Knowledge Management System",
    keywords: "KMS, Knowledge Management System, KNPK",
  });

  // You can update metadata dynamically using setMetadata
  useEffect(() => {
    // Example of changing metadata after a delay or some other event
    setTimeout(() => {
      setMetadata({
        title: "Updated KMS KNPK",
        description: "An advanced Knowledge Management System for KNPK",
        keywords: "Advanced KMS, Knowledge Management System, KNPK",
      });
    }, 3000); // Wait 3 seconds to simulate an update
  }, []);

  return (
    <>
      {/* Dynamic metadata */}
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
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
