import { Box, Card, Flex, Link, Separator, Text } from "@radix-ui/themes";
import moment from "moment";

export default function CardMain(props) {
  // console.log(props.measure);
  return (
    <Link href="" underline="hover">
      <Card size="2" asChild>
        <Flex direction="column" justify="between" height="100%">
          <Text as="div" size="2" weight="bold">
            {props?.measure?.short_name}
          </Text>
          <Text as="div" color="gray" size="2">
            {props?.measure?.full_name}
          </Text>
          <Box>
            <Separator my="3" orientation="horizontal" size="4" />
            <Text mt="auto" as="div" color="gray" size="2">
              {moment(props?.measure?.updated_on).format(
                "dddd, MMMM Do YYYY, h:mm a"
              )}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Link>
  );
}
