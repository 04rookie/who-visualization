import { Container, Flex } from "@radix-ui/themes";
import Navbar from "../Navbar";

export default function layoutDatasetId({ children }) {
  return (
    <div className="h-[95%] w-full">
      {/* <Navbar /> */}
      {children}
    </div>
  );
}
