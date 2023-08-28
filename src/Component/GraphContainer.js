"use client";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function GraphContainer({ measure }) {
  const dimension = measure?.dimensions?.[0]?.values;
  const attributes = measure?.attributes?.[0]?.values;
  // console.log("measure: " + measure?.dimensions?.[0]?.values?.[0]?.who_code);
  // console.log(dimension);
  const countryCodeMap = dimension?.map((element) => {
    // console.log(element);
    return element?.who_code;
  });
  const attributesMap = attributes?.map((element) => {
    return element?.code;
  });

  // console.log("dimension: " + dimension);
  // console.log("attributes: " + attributes);
  // console.log("country code map: " + countryCodeMap?.[0]);
  // console.log("country code map: " + attributesMap?.[0]);
  // Number of dimensions = number of lines
  // Number of attributes = number of graphs
  const tempDataset = [];
  measure?.data?.forEach((element) => {
    if (
      element?.attributes?.MEASURE_TYPE === "AVG_ARITH" &&
      element?.dimensions?.COUNTRY === "ALB"
    ) {
      tempDataset.push({
        name: "ALB",
        yAxis: element?.value?.numeric,
        xAxis: element?.dimensions?.YEAR,
      });
    }
  });
  // console.log(tempDataset);
  return (
    <div className="h-full w-full flex">
      <div className="h-4/5 w-4/5 m-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={200} height={200} data={tempDataset}>
            <Tooltip />
            <Legend />
            <XAxis dataKey="xAxis" />
            <YAxis tickCount={15} />
            <Line type="monotone" dataKey="yAxis" stroke="#8884d8" name="Y Axis"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
