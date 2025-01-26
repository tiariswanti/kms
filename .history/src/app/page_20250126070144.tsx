"use client";
import React, { useEffect } from "react";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";

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
    <div>
      <BannerHome
    </div>
  );
}
