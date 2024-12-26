import React from "react";
import Chart from "./Chart";
import TopArticles from "./TopArticle";

export default function Dashboard() {
  return (
    <div className="sm:mx-auto mx-4 mt-2 sm:ml-64 sm:mr-8 sm:my-4">
      <div className="bg-white shadow-xl rounded-xl p-6 mb-4 mt-16">
        <Chart />
      </div>
      <div className="bg-white shadow-xl rounded-xl p-2">
        <TopArticles />
      </div>
    </div>
  );
}