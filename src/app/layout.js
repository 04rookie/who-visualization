import "./globals.css";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Who-Visualization",
  description: "Visualize the dataset published by WHO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <Theme appearance="dark" > */}
        <Theme
          appearance="dark"
          accentColor="tomato"
          grayColor="sage"
          radius="small"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
