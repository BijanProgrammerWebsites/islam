import { ReactNode } from "react";

import DuaComponent from "@/components/dua/dua.component";

import { duaData } from "@/data/dua.data";

import { Dua } from "@/types/dua.type";
import { Faraaz } from "@/types/faraaz.type";
import { RawDua } from "@/types/raw-dua.type";
import { Token } from "@/types/token.type";

import styles from "./page.module.css";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function Page({ params }: Props): Promise<ReactNode> {
  const { name } = await params;

  const title = duaData[name]?.title;
  const dua = await loadDua(name);

  if (!title || !dua) {
    return <div className={styles.dua}>دعای مورد نظر پیدا نشد!</div>;
  }

  return (
    <div className={styles.dua}>
      <DuaComponent title={title} dua={dua} />
    </div>
  );
}

async function loadDua(jsonFilename: string): Promise<Dua | null> {
  const rawDua: RawDua = (await import(`@/assets/dua/${jsonFilename}.json`))
    .default;

  if (!rawDua) {
    return null;
  }

  const dua: Dua = { audioSource: rawDua.audioSource, faraazes: [] };

  rawDua.faraazes.forEach((items) => {
    const faraaz: Faraaz = { arabicTokens: [], persianTokens: [] };

    items.forEach((item) => {
      const common: Omit<Token, "text"> = {
        isFromQuran: !!item.isFromQuran,
        start: item.timestamps?.[0],
        end: item.timestamps?.[1],
      };

      faraaz.arabicTokens.push({ ...common, text: item.arabic });
      faraaz.persianTokens.push({ ...common, text: item.persian });
    });

    dua.faraazes.push(faraaz);
  });

  return dua;
}
