"use client";

import Loading from "@/app/loading";
import dynamic from "next/dynamic";

const LineChartComponent = dynamic(() => import("./LineChartComponent"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function GraphContainer({
  measure,
  countryMapState,
  graphIndex,
}) {
  // let attributeMap = {};
  // console.log(graphIndex)
  const dimension = measure?.dimensions;
  // const dimensionSecondary = measure?.dimensions?.[1]?.values;
  const attributes = measure?.attributes?.[0]?.values;
  let countryMap = {};
  dimension?.[0]?.values.forEach((dim, index) => {
    if (countryMapState?.[dim?.who_code]) {
      countryMap[dim?.who_code] = -1;
    }
  });
  dimension?.[1]?.values.forEach((dim, index) => {
    if (countryMapState?.[dim?.code]) {
      countryMap[dim?.code] = -1;
    }
  });
  // console.log(countryMap)
  // attributes.forEach((attribute, index) => {
  //   attributeMap[attribute?.code] = {
  //     attributeIndex: index,
  //   };
  // });
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
      // console.log("---------------------------");
      // console.log(datum?.attributes?.MEASURE_TYPE);
      // console.log(attributes?.[graphIndex]?.code);
      // console.log("---------------------------");
      if (
        datum?.dimensions?.COUNTRY?.length !== 0 &&
        datum?.dimensions?.COUNTRY !== undefined &&
        countryMap?.[datum?.dimensions?.COUNTRY] !== undefined &&
        datum?.attributes?.MEASURE_TYPE === attributes?.[graphIndex]?.code
      ) {
        const diff =
          datum?.dimensions?.YEAR - measure?.dimensions?.[3]?.lower_bound;
        graph[diff].yData[datum?.dimensions?.COUNTRY] = datum?.value?.numeric;
      } else if (
        datum?.dimensions?.COUNTRY_GRP?.length !== 0 &&
        datum?.dimensions?.COUNTRY_GRP !== undefined &&
        countryMap?.[datum?.dimensions?.COUNTRY_GRP] !== undefined &&
        datum?.attributes?.MEASURE_TYPE === attributes?.[graphIndex]?.code
      ) {
        // console.log(datum?.attributes?.MEASURE_TYPE);
        const diff =
          datum?.dimensions?.YEAR - measure?.dimensions?.[3]?.lower_bound;
        graph[diff].yData[datum?.dimensions?.COUNTRY_GRP] =
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
  // console.log(graphs)
  return (
    <div className="h-full w-5/6 flex">
      <div className="h-full w-full m-auto">
        <LineChartComponent
          graphIndex={graphIndex}
          tempLabel={tempLabel}
          dimension={dimension?.[graphIndex]?.values}
          random_rgba={random_rgba}
          graphs={graphs}
        />
      </div>
    </div>
  );
}
