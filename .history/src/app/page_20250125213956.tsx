"use client";

import React, { useEffect } from "react";
import Banner from "./components/Home/Banner";
import Recomendation from "./components/Home/Recomendation";

export default function Home() {
  useEffect(() => {
    // Set document title
    document.title = "Welcome to KMS KNPK";

    // Set the description meta tag
    const descriptionMetaTag = document.querySelector(
      'meta[name="KMS KNPK"]'
    );
    if (descriptionMetaTag) {
      descriptionMetaTag.setAttribute(
        "content",
        "Browse through recommendations and more."
      );
    } else {
      const newDescriptionMeta = document.createElement("meta");
      newDescriptionMeta.name = "description";
      newDescriptionMeta.content = "Browse through recommendations and more.";
      document.head.appendChild(newDescriptionMeta);
    }

    // Set Open Graph (OG) meta tags for social sharing
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      (ogTitleMeta as HTMLElement).setAttribute(
        "content",
        "Knowledge Management System"
      );
    } else {
      const newOgTitleMeta = document.createElement("meta");
      newOgTitleMeta.setAttribute("property", "og:title");
      newOgTitleMeta.setAttribute("content", "Welcome to KMS KNPK");
      document.head.appendChild(newOgTitleMeta);
    }

    const ogDescriptionMeta = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescriptionMeta) {
      (ogDescriptionMeta as HTMLElement).setAttribute(
        "content",
        "Browse through recommendations and more."
      );
    } else {
      const newOgDescriptionMeta = document.createElement("meta");
      newOgDescriptionMeta.setAttribute("property", "og:description");
      newOgDescriptionMeta.setAttribute(
        "content",
        "Browse through recommendations and more."
      );
      document.head.appendChild(newOgDescriptionMeta);
    }
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
