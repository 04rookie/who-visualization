import { Providers } from "@/util/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import DarkModeButton from "@/util/Darkmode";
import '@radix-ui/themes/styles.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Who-Visualization",
  description: "Visualize the dataset published by WHO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <DarkModeButton />
          {children}
        </Providers>
      </body>
    </html>
  );
}
