"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RecentActivityChart = ({ data }: { data: any[] | any }) => {
  const labels = data?.map((item: any, index: any) => `Content ${index + 1}`);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Ratings",
        data: data?.map((item: any) => item.rating?.length || 0),
        backgroundColor: "#501078",
        borderColor: "#ECD2FC",
        borderWidth: 1,
      },
      {
        label: "Number of Comments",
        data: data?.map(
          (item: any) => item.rating?.filter((r: any) => r.comment).length || 0
        ),
        backgroundColor: "#FF6F61",
        borderColor: "#FFD2D2",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Recent Activity",
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {/* <h2 className="text-lg font-bold text-[#501078] mb-4">Recent Activity</h2> */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export { RecentActivityChart };
