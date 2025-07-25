import { ReactNode } from "react";

import Link from "next/link";

import { duaData } from "@/data/dua.data";

import styles from "./page.module.css";

export default function Page(): ReactNode {
  return (
    <div className={styles.page}>
      <ul className={styles.routes}>
        {duaData.map((route) => (
          <li key={route.title}>
            <Link href={route.path}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
