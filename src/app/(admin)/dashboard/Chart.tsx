// LineChartWithFilter.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Dropdown from "@/app/components/Input/Dropdown";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyViews {
  month: string;
  views: number;
}

interface YearlyViews {
  year: number;
  data: MonthlyViews[];
}

const LineChartWithFilter = () => {
  const [viewsData, setViewsData] = useState<MonthlyViews[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/articlesViews`);
        const data: YearlyViews[] = await response.json();
        const yearData =
          data.find((item) => item.year === selectedYear)?.data || [];
        setViewsData(yearData);
      } catch (error) {
        console.error("Error fetching views data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    const startYear = 2024;
    const currentYear = new Date().getFullYear();
    const availableYears: number[] = [];

    for (let year = startYear; year <= currentYear; year++) {
      availableYears.push(year);
    }

    setYears(availableYears);
  }, []);

  const chartData = {
    labels: viewsData.map((data) => data.month),
    datasets: [
      {
        data: viewsData.map((data) => data.views),
        fill: false,
        borderColor: "#700C08",
        tension: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Views",
        },
      },
    },
    grid: {
      display: false,
    },
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2">Number of Views per Month</h2>
      <div className="flex items-center">
        <label htmlFor="yearFilter" className="mr-2">
          Year:
        </label>
        <Dropdown
          options={years.map((year) => ({ value: year, label: year }))}
          selectedOption={selectedYear}
          onSelect={(year) => setSelectedYear(Number(year))}
          dropdownButton="border bg-gray-50 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none p-1.5 cursor-pointer flex justify-between items-center"
        />
      </div>
      <div className="w-full max-w-2xl p-2">
        <div className="overflow-x-auto">
          <div className="min-w-max h-64 sm:h-80 ">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChartWithFilter;
