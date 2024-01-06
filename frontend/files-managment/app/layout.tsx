import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdProvider from "./providers/AntdProvider";
import "../global.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Source safe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </AntdProvider>
      </body>
    </html>
  );
}
