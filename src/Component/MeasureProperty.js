import { Card, Container, Flex, Text } from "@radix-ui/themes";
import DatasetTable from "./DatasetTable";
import GraphContainer from "./GraphContainer";

export default function MeasureProperty({ measure }) {
  const measureTemp = Object.keys(measure);
  const measureArray = measureTemp.map((item, index) => {
    const type = typeof measure?.[item];
    return { name: item, type: type };
  });
  // console.log(measure);
  return (
    <div className="h-full w-full">
      {/* <DatasetTable measureArray={measureArray} /> */}
      <GraphContainer measure={measure}/>
    </div>
  );
}
