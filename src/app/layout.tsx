import { PropsWithChildren, ReactNode } from "react";

import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import localFont from "next/font/local";

import HeaderComponent from "@/components/header/header.component";

import ThemeProvider from "@/providers/theme.provider";

import "@/styles/button.css";
import "@/styles/colors.css";
import "@/styles/shadows.css";

import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const amiriQuran = localFont({
  src: "../assets/fonts/AmiriQuranColored.ttf",
  variable: "--font-amiri-quran",
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
        <ThemeProvider>
          <HeaderComponent />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
