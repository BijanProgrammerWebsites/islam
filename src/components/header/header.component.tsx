"use client";

import { ReactNode, use } from "react";

import Link from "next/link";

import { ThemeContext } from "@/context/theme.context";

import MingcuteMoonLine from "@/icons/MingcuteMoonLine";
import MingcuteSunLine from "@/icons/MingcuteSunLine";

import styles from "./header.module.css";

export default function HeaderComponent(): ReactNode {
  const { theme, toggleTheme } = use(ThemeContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">اسلام</Link>
      </div>
      <button className={styles.icon} onClick={toggleTheme}>
        {theme === "light" ? <MingcuteMoonLine /> : <MingcuteSunLine />}
      </button>
    </header>
  );
}
