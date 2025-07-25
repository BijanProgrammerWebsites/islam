import { ReactNode } from "react";

import Link from "next/link";

import { duaRoutes } from "@/data/dua-routes";

import styles from "./page.module.css";

export default function Page(): ReactNode {
  return (
    <div className={styles.page}>
      <ul className={styles.routes}>
        {duaRoutes.map((route) => (
          <li key={route.title}>
            <Link href={route.path}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
