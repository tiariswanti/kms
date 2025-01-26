import React from "react";
import Chart from "./Chart";
import TopArticles from "./TopArticle";

export default function Dashboard() {
  return (
    <div className="sm:mx-auto mx-4 sm:ml-64 sm:mr-8 my-8 ">
      <div className="bg-white shadow-xl rounded-xl p-6 mb-4 mt-4">
        <Chart />
      </div>
      <div className="bg-white shadow-xl rounded-xl p-2 mt-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 mx-6">
          Top Articles This Month
        </h2>
        <TopArticles />
      </div>
    </div>
  );
}
