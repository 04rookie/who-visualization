"use client";
import {
  Checkbox,
  Flex,
  Heading,
  Link,
  RadioGroup,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";

export default function Sidebar({
  measure,
  countryMapState,
  setCountryMapState,
  graphIndex,
  setGraphIndex,
}) {
  const [readMoreFlag, setReadMoreFlag] = useState(false);
  const [selectOption, setSelectOption] = useState({
    selectAll: false,
    disableAll: false,
  });
  return (
    <div className="h-full w-full py-5 px-1 overflow-auto">
      <Heading as="div" weight={"bold"} highContrast={true}>
        {measure?.full_name}.
      </Heading>
      <Separator size={4} my="4" />
      <Text as="p">
        {readMoreFlag
          ? measure?.notes?.[0]?.values[0]?.value
              .replaceAll("<.*?>", "")
              .replaceAll("<br/>", "") + "...."
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
      <Text as="div" weight={"medium"} highContrast={true} mb="4">
        Select a type of <Strong>measure</Strong>.
      </Text>
      <RadioGroup.Root defaultValue="0">
        <Flex gap="2" direction="column">
          {measure?.attributes?.[0]?.values?.map((attribute, index) => {
            return (
              <label key={index}>
                <Flex gap="2" align="center">
                  <RadioGroup.Item
                    value={`${index}`}
                    checked={graphIndex === index}
                    onClick={() => setGraphIndex(index)}
                  />
                  <Text size="2" weight={"regular"}>
                    {attribute?.label}
                  </Text>
                </Flex>
              </label>
            );
          })}
        </Flex>
      </RadioGroup.Root>
      <Separator size={4} my="4" />
      <Text as="div" weight={"medium"} highContrast={true} mb="4">
        Select countries.
      </Text>
      <Flex gap="2" direction={"column"}>
        <Text size="2">
          <label>
            <Checkbox
              mr="1"
              defaultChecked
              checked={selectOption.selectAll}
              onClick={() => {
                const tempKeys = Object.keys(countryMapState);
                let countryMapStateTemp = { ...countryMapState };
                tempKeys.forEach((element) => {
                  countryMapStateTemp[element] = true;
                });
                setSelectOption({
                  selectAll: !selectOption.selectAll,
                  disableAll: false,
                });
                setCountryMapState(countryMapStateTemp);
              }}
            />
            Select all
          </label>
        </Text>
        <Text size="2">
          <label>
            <Checkbox
              mr="1"
              checked={selectOption.disableAll}
              onClick={() => {
                const tempKeys = Object.keys(countryMapState);
                let countryMapStateTemp = { ...countryMapState };
                tempKeys.forEach((element) => {
                  countryMapStateTemp[element] = false;
                });
                setCountryMapState(countryMapStateTemp);
                setSelectOption({
                  selectAll: false,
                  disableAll: !selectOption.disableAll,
                });
              }}
            />
            Disable all
          </label>
        </Text>
        {measure?.dimensions?.[0]?.values?.map((dimension, index) => {
          return (
            <Text key={index} size="2">
              <label>
                <Checkbox
                  mr="1"
                  defaultChecked
                  checked={countryMapState?.[dimension?.who_code]}
                  onClick={() => {
                    setCountryMapState((prev) => {
                      setSelectOption({
                        selectAll: false,
                        disableAll: false,
                      });
                      return {
                        ...prev,
                        [dimension.who_code]:
                          !countryMapState?.[dimension?.who_code],
                      };
                    });
                  }}
                />{" "}
                {dimension?.full_name}
              </label>
            </Text>
          );
        })}
        {measure?.dimensions?.[1]?.values?.map((dimension, index) => {
          return (
            <Text key={index} size="2">
              <label>
                <Checkbox
                  mr="1"
                  defaultChecked
                  checked={countryMapState?.[dimension?.code]}
                  onClick={() => {
                    setCountryMapState((prev) => {
                      setSelectOption({
                        selectAll: false,
                        disableAll: false,
                      });
                      return {
                        ...prev,
                        [dimension.code]:
                          !countryMapState?.[dimension?.code],
                      };
                    });
                  }}
                />{" "}
                {dimension?.full_name}
              </label>
            </Text>
          );
        })}
      </Flex>
    </div>
  );
}
