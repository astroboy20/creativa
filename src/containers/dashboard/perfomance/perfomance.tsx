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
  const { data: projects } = useFetchItem({
    collectionName: "creators",
    filterByUser: false,
  });
  const chartData = {
    labels: data?.map((item) => item.name) || [], // Labels for the chart
    datasets: [
      {
        label: "Total Uploads",
        data: data?.map((item) => item.uploads || 0), // Data for the total uploads
        backgroundColor: "#501078",
      },
      {
        label: "Average Rating",
        data: data?.map((item) => item.averageRating || 0), // Data for average ratings
        backgroundColor: "#ECD2FC66",
      },
      {
        label: "Total Comments",
        data: data?.map((item) => item.totalComments || 0), // Data for total comments
        backgroundColor: "#FF6F61",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
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
