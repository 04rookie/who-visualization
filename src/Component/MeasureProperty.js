import { Card, Container, Flex, Text } from "@radix-ui/themes";
import DatasetTable from "./DatasetTable";

export default function MeasureProperty({ measure }) {
  const measureTemp = Object.keys(measure);
  const measureArray = measureTemp.map((item, index) => {
    const type = typeof measure?.[item];
    return { name: item, type: type };
  });
  console.log(measure);
  return (
    <>
      <DatasetTable measureArray={measureArray} />
      {/* <Card asChild>
        <Flex direction={"column"} justify={"between"} align={"center"}>
          {measureArray?.map((item, index) => {
            return (
              <Text key={index} as="div" size="2" weight="bold">
                {item}
              </Text>
            );
          })}
        </Flex>
      </Card> */}
    </>
  );
}
