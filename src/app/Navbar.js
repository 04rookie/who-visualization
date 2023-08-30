import { SunIcon } from "@radix-ui/react-icons";
import { Heading, IconButton, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function Navbar({ setIsDark, isDark }) {
  const PALLETTE = [
    "indigo-300",
    "cyan-300",
    "orange-300",
    "crimson-300",
    "sky-300",
    "mint-300",
    "lime-300",
    "yellow-300",
    "amber-300",
    "grass-300",
    "purple-300",
    "green-300",
    "iris-300",
  ];
  return (
    <div className="w-full h-[5%] bg-zinc-950 flex flex-row justify-between items-center">
      <Link href="/">
        <Heading
          as="div"
          className="pl-4 pt-1 hover:cursor-pointer"
          color={PALLETTE[Math.floor(Math.random() * 12)]}
        >
          <Text>Who.Visualization</Text>
        </Heading>
      </Link>
      <div className="pr-4">
        <IconButton color="gray" onClick={() => setIsDark(!isDark)}>
          <SunIcon />
        </IconButton>
      </div>
    </div>
  );
}
