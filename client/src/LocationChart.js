
import React from "react";
import Chart from "chart.js/auto";

import { Bar } from "react-chartjs-2";

export const LocationChart = ({ data }) => {
  const labels = data.map((l) => l.name);
  const chartData = {
    labels,
    datasets: [
      {
        label: data[0]?.attributes[0] ?? "Loading",
        data: data.map((l) => l.count),
      },
    ],
  };

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of restaurants with selected accommodations",
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};