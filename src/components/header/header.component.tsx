import type { ReactNode } from "react";

import styles from "./header.module.css";

export default function HeaderComponent(): ReactNode {
  return <div className={styles.header}></div>;
}
