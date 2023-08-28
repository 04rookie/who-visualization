import { Box, Card, Flex, Link, Separator, Text } from "@radix-ui/themes";
import moment from "moment";

export default function CardMain(props) {
  // console.log(props.measure);
  return (
    <Card asChild>
      <Flex direction="column" justify="between">
        <Text mt="auto" as="div" color="gray" size="2">
          {moment(props?.measure?.updated_on).format(
            "ddd, MMMM Do YYYY, h:mm a"
          )}
        </Text>
        <Separator mt="1" mb="4" orientation="horizontal" size="4" />
        <Text as="div" size="2" weight="bold">
          {props?.measure?.short_name}
        </Text>
        <Text as="div" color="gray" size="2">
          {props?.measure?.full_name}
        </Text>
      </Flex>
    </Card>
  );
}
