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
}) {
  Chart.register(zoomPlugin);

  const CODE_PROPERTY = graphIndex === 0 ? "who_code" : "code";
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
          const RGBA = random_rgba();
          return {
            label: country?.[CODE_PROPERTY],
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
