"use client";

import { ReactNode, useState } from "react";

import AudioManagerComponent from "@/components/audio-manager/audio-manager.component";
import useScroller from "@/components/dua/hooks/use-scroller.hook";
import FaraazComponent from "@/components/faraaz/faraaz.component";

import HighlightProvider from "@/providers/highlight.provider";

import { Dua } from "@/types/dua.type";

import styles from "./dua.module.css";

type Props = {
  title: string;
  dua: Dua;
};

export default function DuaComponent({ title, dua }: Props): ReactNode {
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { goToPlayingFaraaz } = useScroller(dua, currentTime);

  const currentTimeChangeHandler = (currentTime: number): void => {
    setCurrentTime(currentTime);
    goToPlayingFaraaz();
  };

  return (
    <HighlightProvider>
      <div className={styles.dua}>
        <h1>{title}</h1>
        <AudioManagerComponent
          src={dua.audioSource}
          onCurrentTimeChange={currentTimeChangeHandler}
        />
        <div className={styles.dua}>
          {dua.faraazes.map((faraaz, faraazIndex) => (
            <div key={faraazIndex} className={styles.faraaz} data-faraaz>
              {(["arabic", "persian"] as const).map((language) => (
                <FaraazComponent
                  key={language}
                  language={language}
                  faraaz={faraaz}
                  faraazIndex={faraazIndex}
                  currentTime={currentTime}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </HighlightProvider>
  );
}
