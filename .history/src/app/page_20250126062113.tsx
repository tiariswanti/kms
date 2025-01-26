"use client";
import React from "react";
import Head from "next/head";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";


export async function getServerSideProps() {
  // Ambil data dinamis yang digunakan untuk metadata
  const metadata = {
    title: "Dynamic SEO Title",
    description: "This is a dynamic SEO description based on server data.",
  };

  return {
    props: { metadata }, // Kirim metadata ke komponen
  };
}
export default function Home() {
  return (
    <>
      <Head>
        <title>Dynamic Metadata Example</title>
        <meta
          name="description"
          content="This is a dynamic metadata example."
        />
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
