"use client";
import React, { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    // Set the document title
    document.title = "KMS KNPK";

    // Create and set a custom meta tag for KMS KNPK
    const meta = document.createElement("meta");
    meta.name = "KMS KNPK";
    meta.content = "Knowledge Management System";
    document.head.appendChild(meta);
  }, []);

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
