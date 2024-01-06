"use client";
import { ConfigProvider, ThemeConfig, theme } from "antd";
import { Poppins } from "next/font/google";
import React, { PropsWithChildren } from "react";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#8CCA6E",
    colorSuccess: "#52c41a",
    colorError: "#ff4d4f",
    colorWarning: "#faad14",
    colorInfo: "#1677ff",
    fontFamily: poppins.style.fontFamily,
    fontSize: 14,
    borderRadius: 4,
    controlHeight: 32,
  },
  components: {
    Button: {
      algorithm: true,
      controlHeight: 38,
    },
    Input: {
      algorithm: true,
      controlHeight: 42,
    },
    Menu: {
      darkItemBg: "transparent",
    },
  },
};

function AntdProvider({ children }: PropsWithChildren) {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}

export default AntdProvider;
