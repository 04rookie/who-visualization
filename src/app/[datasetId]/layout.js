import { Container, Flex } from "@radix-ui/themes";

export default function layoutDatasetId({ children }) {
  return (
    <div className="h-full flex justify-between content-center">
      <Flex justify="center" width="100%" align="center">
      {children}
      </Flex>
    </div>
  );
}
