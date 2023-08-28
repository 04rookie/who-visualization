import { Card, Container, Flex, Text } from "@radix-ui/themes";

export default function MeasureProperty({ measure }) {
  const measureArray = Object.keys(measure);
  return (
    <Card asChild>
      <Flex
        direction={"column"}
        justify={"between"}
        align={"center"}
      >
        {measureArray?.map((item, index) => {
          return (
            <Text key={index} as="div" size="2" weight="bold">
              {item}
            </Text>
          );
        })}
      </Flex>
    </Card>
  );
}
