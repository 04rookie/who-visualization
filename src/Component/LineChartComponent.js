"use client";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

export default function LineChartComponent({
  tempLabel,
  dimension,
  random_rgba,
  graphs,
  graphIndex,
  isCountry,
}) {
  //Loading Zoom plugin with Chart library (It has to be registered explicitly according to docs.)
  Chart.register(zoomPlugin);

  //If type country, use 0 or else 1. Because API uses attribute names who_code and code.
  const CODE_PROPERTY = isCountry === 0 ? "who_code" : "code";
  return (
    <Line
      options={{
        spanGaps: true,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        plugins: {
          tooltip: { multiKeyBackground: "#000" },
          legend: {
            display: false,
          },
          zoom: {
            zoom: {
              drag: {
                enabled: true,
              },
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "x",
            },
            pan: {
              enabled: true,
              mode: "xy",
              modifierKey: "ctrl",
              scaleMode: "xy",
            },
          },
        },
      }}
      data={{
        labels: tempLabel,
        datasets: dimension.map((country) => {
          // console.log(country);
          // console.log(graphs[graphIndex]);
          const RGBA = random_rgba();
          return {
            label: country?.short_name,
            data: graphs[graphIndex],
            tension: 0.8,
            pointRadius: 1,
            pointBorderColor: RGBA,
            borderColor: RGBA,
            parsing: {
              xAxisKey: "year",
              yAxisKey: `yData.${country?.[CODE_PROPERTY]}`,
            },
          };
        }),
      }}
    />
  );
}
