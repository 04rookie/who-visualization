"use client";
import { Card, Container, Flex, Text } from "@radix-ui/themes";
import DatasetTable from "./DatasetTable";
import GraphContainer from "./GraphContainer";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

export default function MeasureProperty({ measure }) {
  // const measureTemp = Object.keys(measure);
  const [countryMapState, setCountryMapState] = useState(null);
  useEffect(() => {
    const dimension = measure?.dimensions?.[0]?.values;
    let countryMapTemp = {};
    dimension.forEach((dim, index) => {
      countryMapTemp[dim?.who_code] = -1;
      if (index < 4) {
        countryMapTemp[dim?.who_code] = true;
      } else {
        countryMapTemp[dim?.who_code] = false;
      }
    });
    setCountryMapState(countryMapTemp);
  }, [measure]);
  return (
    <div className="h-full w-full flex flex-row">
      {countryMapState === null ? (
        <></>
      ) : (
        <>
          <GraphContainer measure={measure} countryMapState={countryMapState} />
          <div className="h-full w-1/6 overflow-clip">
            <Sidebar
              measure={measure}
              countryMapState={countryMapState}
              setCountryMapState={setCountryMapState}
            />
          </div>
        </>
      )}
    </div>
  );
}
