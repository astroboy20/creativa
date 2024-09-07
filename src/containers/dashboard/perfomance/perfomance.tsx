"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useFetchItem } from "@/hooks/useFetchItem";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = () => {
  const { data, isLoading, error } = useFetchItem({
    collectionName: "creators",
    filterByUser: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  const chartData = {
    labels: data?.map((item) => item.name) || [], // Labels for the chart
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

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-bold text-[#501078] mb-4">
        Performance Metrics
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export { PerformanceChart };
