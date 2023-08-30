"use client";
import Navbar from "@/app/Navbar";
import { Theme } from "@radix-ui/themes";
import { useState } from "react";

export default function ThemeComponent({ children }) {
  const [isDark, setIsDark] = useState(true);
  return (
    <Theme
      className="h-full"
      appearance={isDark ? "dark" : "light"}
      accentColor="tomato"
      grayColor="sage"
      radius="small"
    >
      <Navbar setIsDark={setIsDark} isDark={isDark}/>
      {children}
      {/* <ThemePanel /> */}
    </Theme>
  );
}
