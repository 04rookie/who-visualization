import "./globals.css";
import { Inter } from "next/font/google";
import { Theme, ThemePanel } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import Navbar from "./Navbar";
import ThemeComponent from "@/Component/ThemeComponent";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Who-Visualization",
  description: "Visualize the dataset published by WHO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-screen">
      <body className={"h-full"}>
        {/* <Theme appearance="dark" > */}
        <ThemeComponent>{children}</ThemeComponent>
      </body>
    </html>
  );
}
