import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryClientProvider from "@/providers/QueryClientProvider";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Moxi - 技术档案",
    template: "%s - Moxi",
  },
  description: "A simple blog by Moxi",
  authors: {
    url: "https://moxixii.com",
    name: "Moxi",
  },
  keywords: [
    "blog",
    "moxi",
    "moxixii",
    "hyou",
    "bunken",
    "hyoubunken",
    "博客",
    "个人站",
  ],
  icons: "/moxi_transparent.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
