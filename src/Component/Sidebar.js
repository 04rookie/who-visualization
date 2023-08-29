"use client";
import {
  Flex,
  Heading,
  Link,
  RadioGroup,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";

export default function Sidebar({ measure }) {
  const [readMoreFlag, setReadMoreFlag] = useState(false);
  return (
    <div className="h-full w-full py-5 px-1 overflow-auto">
      {/* <Text as="div" weight={"bold"} highContrast={true}>{measure?.short_name}</Text> */}
      <Heading as="div" weight={"bold"} highContrast={true}>
        {measure?.full_name}
      </Heading>
      <Separator size={4} my="4" />
      <Text as="p">
        {readMoreFlag
          ? measure?.notes?.[0]?.values[0]?.value
              .replaceAll("<.*?>", "")
              .replaceAll("<br/>", "")
          : measure?.notes?.[0]?.values[0]?.value
              .replaceAll("<.*?>", "")
              .replaceAll("<br/>", "")
              .substring(0, 200) + "...."}
        {readMoreFlag ? (
          <Link onClick={() => setReadMoreFlag(!readMoreFlag)}>Read less</Link>
        ) : (
          <Link onClick={() => setReadMoreFlag(!readMoreFlag)}>Read more</Link>
        )}
      </Text>
      <Separator size={4} my="4" />
      <Text as="div" weight={"regular"} highContrast={true} mb="4">
        Select a type of <Strong>measure</Strong>
      </Text>
      <RadioGroup.Root defaultValue="0">
        <Flex gap="2" direction="column">
          {measure?.attributes?.[0]?.values?.map((attribute, index) => {
            return (
              <label key={index}>
                <Flex gap="2" align="center">
                  <RadioGroup.Item value={`${index}`} />
                  <Text size="2">{attribute?.label}</Text>
                </Flex>
              </label>
            );
          })}
        </Flex>
      </RadioGroup.Root>
      <Separator size={4} my="4" />
      <Text as="div" weight={"bold"} highContrast={true}>
        What am i looking at?
      </Text>
    </div>
  );
}
