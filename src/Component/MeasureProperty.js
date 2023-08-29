import { Card, Container, Flex, Text } from "@radix-ui/themes";
import DatasetTable from "./DatasetTable";
import GraphContainer from "./GraphContainer";
import Sidebar from "./Sidebar";

export default function MeasureProperty({ measure }) {
  const measureTemp = Object.keys(measure);
  const measureArray = measureTemp.map((item, index) => {
    const type = typeof measure?.[item];
    return { name: item, type: type };
  });
  // console.log(measure);
  return (
    <div className="h-full w-full flex flex-row">
      {/* <DatasetTable measureArray={measureArray} /> */}
      <GraphContainer measure={measure} />
      <div className="h-full w-1/6 overflow-clip">
        <Sidebar measure={measure} />
      </div>
    </div>
  );
}
