"use client";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

export default function LineChartComponent({
  tempLabel,
  dimension,
  random_rgba,
  graphs,
}) {
  Chart.register(zoomPlugin);
  return (
    <Line
      options={{
        // layout: {
        //   autoPadding: false,
        //   padding: 1,
        // },
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
              mode: "x",
              modifierKey: "ctrl",
              scaleMode: "x",
            },
          },
        },
      }}
      data={{
        labels: tempLabel,
        datasets: dimension.map((country) => {
          const RGBA = random_rgba();
          return {
            label: country?.who_code,
            data: graphs[0],
            // tension: 0.4,
            pointRadius: 1,
            pointBorderColor: RGBA,
            borderColor: RGBA,
            parsing: {
              xAxisKey: "year",
              yAxisKey: `yData.${country?.who_code}`,
            },
          };
        }),
      }}
    />
  );
}
