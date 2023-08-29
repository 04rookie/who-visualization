"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

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
        ...countryMap,
      });
    }
  });
  // graphs[0][0]["ALB"] = 1;
  graphs.forEach((graph, graphIndex) => {
    measure?.data?.forEach((datum) => {
      if (
        datum?.dimensions?.COUNTRY?.length !== 0 &&
        datum?.dimensions?.COUNTRY !== undefined &&
        countryMap?.[datum?.dimensions?.COUNTRY] !== undefined
      ) {
        const diff =
          datum?.dimensions?.YEAR - measure?.dimensions?.[3]?.lower_bound;
        graphs[graphIndex][diff][datum?.dimensions?.COUNTRY] =
          datum?.value?.numeric;
      }
    });
  });
  const colors = [];
  for (let i = 0; i < 100; i++) {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }

  graphs.forEach((graph) => {
    graph.forEach((element) => {
      const keys = Object.keys(element);
      keys.forEach((key) => {
        if (element[key] === -1) {
          delete element[key];
        }
      });
    });
  });
  return (
    <div className="h-full w-full flex">
      <div className="h-4/5 w-4/5 m-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={200} height={200} data={graphs[0]}>
            <Tooltip />
            <Legend />
            <XAxis dataKey="year" />
            <YAxis tickCount={15} />
            {Object.keys(countryMap)?.map((country, index) => {
              return (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={country}
                  stroke={colors[index]}
                  name={country}
                />
              );
            })}
          </LineChart>
          {/* <LineChart width={200} height={200} data={tempDataset}>
            <Tooltip />
            <Legend />
            <XAxis dataKey="xAxis" />
            <YAxis tickCount={15} />
            <Line
              type="monotone"
              dataKey="yAxis"
              stroke="#8884d8"
              name="Y Axis"
            />
          </LineChart> */}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
