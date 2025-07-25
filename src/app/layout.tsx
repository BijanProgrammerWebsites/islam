import { PropsWithChildren, ReactNode } from "react";

import type { Metadata } from "next";
import { Amiri_Quran, Vazirmatn } from "next/font/google";

import HeaderComponent from "@/components/header/header.component";

import "@/styles/button.css";
import "@/styles/colors.css";

import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const amiriQuran = Amiri_Quran({
  variable: "--font-amiri-quran",
  subsets: ["arabic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Islam",
  description: "Islam by BijanProgrammer",
};

type Props = PropsWithChildren;

export default function RootLayout({ children }: Props): ReactNode {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${amiriQuran.variable}`}
    >
      <body>
        <HeaderComponent />
        <main>{children}</main>
      </body>
    </html>
  );
}
