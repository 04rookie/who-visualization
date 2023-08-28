import { MeasureProperty } from "@/Component/MeasureProperty";
import { Box, Card, Flex, Separator, Text } from "@radix-ui/themes";
import moment from "moment";
import Link from "next/link";

export default async function CardMain(props) {
  // console.log(props.measure);
  return (
    <Link href={`/${props?.measure?.code}`}>
      <Card asChild>
        <Flex direction="column" justify="between">
          <Text mt="auto" as="div" color="gray" size="2">
            {moment(props?.measure?.updated_on).format(
              "ddd, MMM Do YYYY, h:mm a"
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
    </Link>
  );
}
