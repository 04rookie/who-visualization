import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Heading, IconButton, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function Navbar({ setIsDark, isDark }) {
  // const PALLETTE = [
  //   "Indigo",
  //   "cyan",
  //   "orange",
  //   "crimson",
  //   "sky",
  //   "mint",
  //   "lime",
  //   "yellow",
  //   "amber",
  //   "grass",
  //   "purple",
  //   "green",
  //   "iris",
  // ];
  return (
    <div className="w-full h-[5%] bg-zinc-950 flex flex-row justify-between items-center">
      <Link href="/">
        <Heading
          as="div"
          className="pl-4 pt-1 hover:cursor-pointer"
          // color={PALLETTE[Math.floor(Math.random() * 12)]}
        >
          <Text className="text-white">Who.Visualization</Text>
        </Heading>
      </Link>
      <div className="pr-4">
        <IconButton color="gray" onClick={() => setIsDark(!isDark)}>
          {isDark ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </div>
    </div>
  );
}
