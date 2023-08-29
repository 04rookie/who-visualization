"use client";

import dynamic from "next/dynamic";

const LineChartComponent = dynamic(() => import("./LineChartComponent"), {
  loading: () => "...Loading",
  ssr: false,
});

export default function GraphContainer({ measure }) {
  let attributeMap = {};
  const dimension = measure?.dimensions?.[0]?.values;
  const attributes = measure?.attributes?.[0]?.values;
  let countryMap = {};
  dimension.forEach((dim, index) => {
    countryMap[dim?.who_code] = -1;
  });
  attributes.forEach((attribute, index) => {
    attributeMap[attribute?.code] = {
      attributeIndex: index,
    };
  });
  let graphs = attributes?.map((element) => []);
  const YEARRANGE =
    measure?.dimensions?.[3]?.upper_bound -
    measure?.dimensions?.[3]?.lower_bound +
    1;

  graphs.forEach((graph, index) => {
    for (let count = 0; count < YEARRANGE; count++) {
      graph.push({
        year: measure?.dimensions?.[3]?.lower_bound + count,
        yData: {
          ...countryMap,
        },
      });
    }
  });

  graphs.forEach((graph, graphIndex) => {
    measure?.data?.forEach((datum) => {
      if (
        datum?.dimensions?.COUNTRY?.length !== 0 &&
        datum?.dimensions?.COUNTRY !== undefined &&
        countryMap?.[datum?.dimensions?.COUNTRY] !== undefined
      ) {
        const diff =
          datum?.dimensions?.YEAR - measure?.dimensions?.[3]?.lower_bound;
        graphs[graphIndex][diff].yData[datum?.dimensions?.COUNTRY] =
          datum?.value?.numeric;
      }
    });
  });

  function random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + "," + 1 + ")"
    );
  }

  // const colors = [];
  // for (let i = 0; i < 100; i++) {
  //   // const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  //   colors.push(random_rgba());
  // }

  graphs.forEach((graph) => {
    graph.forEach((element) => {
      const keys = Object.keys(element.yData);
      keys.forEach((key) => {
        if (element.yData[key] === -1) {
          delete element.yData[key];
        }
      });
    });
  });

  let tempLabel = [];
  for (let count = 0; count < YEARRANGE; count++) {
    tempLabel.push(measure?.dimensions?.[3]?.lower_bound + count);
  }

  return (
    <div className="h-full w-full flex">
      <div className="h-4/5 w-4/5 m-auto">
        <LineChartComponent
          tempLabel={tempLabel}
          dimension={dimension}
          random_rgba={random_rgba}
          graphs={graphs}
        />
      </div>
    </div>
  );
}
