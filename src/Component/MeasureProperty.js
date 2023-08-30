"use client";
import GraphContainer from "./GraphContainer";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

export default function MeasureProperty({ measure }) {
  const [countryMapState, setCountryMapState] = useState(null);
  const [graphIndex, setGraphIndex] = useState(0);

  useEffect(() => {
    const dimension = measure?.dimensions;
    let countryMapTemp = {};
    dimension?.[0]?.values.forEach((dim, index) => {
      // countryMapTemp[dim?.who_code] = -1;
      if (index < 4) {
        countryMapTemp[dim?.who_code] = true;
      } else {
        countryMapTemp[dim?.who_code] = false;
      }
    });
    dimension?.[1]?.values.forEach((dim, index)=>{
      countryMapTemp[dim?.code] = false
    })
    setCountryMapState(countryMapTemp);
  }, [measure]);
  return (
    <div className="h-full w-full flex flex-row">
      {countryMapState === null ? (
        <></>
      ) : (
        <>
          <GraphContainer
            measure={measure}
            countryMapState={countryMapState}
            graphIndex={graphIndex}
          />
          <div className="h-full w-1/6 overflow-clip">
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
