"use client";
import GraphContainer from "./GraphContainer";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

export default function MeasureProperty({ measure }) {
  //This will store all the countries and country groups, only true values will be rendered in the graph.
  const [countryMapState, setCountryMapState] = useState(null);

  //This stores index value of which graph to display. (Basically which attribute)
  const [graphIndex, setGraphIndex] = useState(0);

  //Side effect to initalise all the values with true value in countryMapState, only first N (4) values will stay true by default.
  useEffect(() => {
    const dimension = measure?.dimensions;
    let countryMapTemp = {};
    //first iterate through all countries
    dimension?.[0]?.values.forEach((dim, index) => {
      //change this to set how many countries should be rendered by defualt when graph first mounts.
      if (index < 4) {
        countryMapTemp[dim?.who_code] = true;
      } else {
        countryMapTemp[dim?.who_code] = false;
      }
    });
    //second iterate through all country groups
    dimension?.[1]?.values.forEach((dim, index) => {
      countryMapTemp[dim?.code] = false;
    });
    setCountryMapState(countryMapTemp);
  }, [measure]);
  return (
    <div className="h-full w-full flex xl:flex-row lg:flex-row md:flex-row xs:flex-row initial:flex-col">
      {countryMapState === null ? (
        <></>
      ) : (
        <>
          <GraphContainer
            measure={measure}
            countryMapState={countryMapState}
            graphIndex={graphIndex}
          />
          <div className="h-full md:w-1/6 xl:w-1/6 lg:w-1/6 sm:w-1/6 xs:w-[100%] xl:overflow-clip lg:overflow-clip md:overflow-clip sm:overflow-clip">
            <Sidebar
              measure={measure}
              countryMapState={countryMapState}
              setCountryMapState={setCountryMapState}
              graphIndex={graphIndex}
              setGraphIndex={setGraphIndex}
            />
          </div>
        </>
      )}
    </div>
  );
}
