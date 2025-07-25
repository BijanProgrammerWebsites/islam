import { ReactNode } from "react";

import Link from "next/link";

import { duaData } from "@/data/dua.data";

import styles from "./page.module.css";

export default function Page(): ReactNode {
  return (
    <div className={styles.page}>
      <ul className={styles.routes}>
        {Object.entries(duaData).map(([path, dua]) => (
          <li key={dua.title}>
            <Link href={path}>{dua.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
