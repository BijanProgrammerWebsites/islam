"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import clsx from "clsx";

import AudioManagerComponent from "@/components/audio-manager/audio-manager.component";

import { Dua } from "@/types/dua.type";
import { Token } from "@/types/token.type";

import styles from "./dua.module.css";

type Props = {
  title: string;
  dua: Dua;
};

export default function DuaComponent({ title, dua }: Props): ReactNode {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [highlightedFaraazIndex, setHighlightedFaraazIndex] = useState<
    number | null
  >(null);
  const [highlightedTokenIndex, setHighlightedTokenIndex] = useState<
    number | null
  >(null);

  const duaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageUpKeyHandler = (e: KeyboardEvent): void => {
      e.preventDefault();
      goToPreviousFaraaz();
    };

    const pageDownKeyHandler = (e: KeyboardEvent): void => {
      e.preventDefault();
      goToNextFaraaz();
    };

    document.addEventListener("keyup", pageUpKeyHandler);
    document.addEventListener("keydown", pageDownKeyHandler);

    return () => {
      document.removeEventListener("keyup", pageUpKeyHandler);
      document.removeEventListener("keydown", pageDownKeyHandler);
    };
  }, []);

  const faraazes = [
    ...(duaRef.current?.querySelectorAll<HTMLDivElement>(styles.faraaz) ?? []),
  ];

  const currentTimeChangeHandler = (currentTime: number): void => {
    setCurrentTime(currentTime);
    goToPlayingFaraaz();
  };

  const tokenMouseEnterHandler = (
    faraazIndex: number,
    tokenIndex: number,
  ): void => {
    setHighlightedFaraazIndex(faraazIndex);
    setHighlightedTokenIndex(tokenIndex);
  };

  const tokenMouseLeaveHandler = (): void => {
    setHighlightedFaraazIndex(null);
    setHighlightedTokenIndex(null);
  };

  const goToPlayingFaraaz = (): void => {
    const index = findPlayingFaraazIndex();
    const faraaz = faraazes[index];

    if (!faraaz) {
      return;
    }

    window.scrollTo({ top: faraaz.offsetTop });
  };

  const goToPreviousFaraaz = (): void => {
    const nearestIndex = findNearestFaraazIndex();

    if (window.scrollY > faraazes[nearestIndex].offsetTop) {
      window.scrollTo({ top: faraazes[nearestIndex].offsetTop });
    } else if (nearestIndex - 1 >= 0) {
      window.scrollTo({ top: faraazes[nearestIndex - 1].offsetTop });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  const goToNextFaraaz = (): void => {
    const nearestIndex = findNearestFaraazIndex();

    if (window.scrollY < faraazes[nearestIndex].offsetTop) {
      window.scrollTo({ top: faraazes[nearestIndex].offsetTop });
    } else if (nearestIndex + 1 < faraazes.length) {
      window.scrollTo({ top: faraazes[nearestIndex + 1].offsetTop });
    } else {
      window.scrollTo({ top: document.body.scrollHeight });
    }
  };

  const findPlayingFaraazIndex = (): number => {
    return dua.faraazes.findIndex((faraaz) => {
      return faraaz.arabicTokens.some((token) => {
        if (!token.start || !token.end) {
          return false;
        }

        return token.start <= currentTime && currentTime <= token.end;
      });
    });
  };

  const findNearestFaraazIndex = (): number => {
    let nearestElementIndex = 0;
    let minimumDistance = Number.MAX_VALUE;

    for (let i = 0; i < faraazes.length; i++) {
      const distance = Math.abs(faraazes[i].offsetTop - window.scrollY);

      if (minimumDistance > distance) {
        minimumDistance = distance;
        nearestElementIndex = i;
      }
    }

    return nearestElementIndex;
  };

  return (
    <div className={styles.dua}>
      <h1>{title}</h1>
      <AudioManagerComponent
        src={dua.audioSource}
        onCurrentTimeChange={currentTimeChangeHandler}
      />

      <div ref={duaRef} className={styles.dua}>
        {dua.faraazes.map((faraaz, faraazIndex) => (
          <div key={faraazIndex} className={styles.faraaz}>
            <div className={styles.arabic}>
              {faraaz.arabicTokens.map((arabicToken, tokenIndex) => (
                <div
                  key={tokenIndex}
                  className={clsx(styles.token, {
                    [styles.quran]: arabicToken.isFromQuran,
                    [styles.highlighted]:
                      faraazIndex === highlightedFaraazIndex &&
                      tokenIndex === highlightedTokenIndex,
                    [styles.playing]: isPlaying(arabicToken, currentTime),
                  })}
                  onMouseEnter={() =>
                    tokenMouseEnterHandler(faraazIndex, tokenIndex)
                  }
                  onMouseLeave={() => tokenMouseLeaveHandler()}
                >
                  {arabicToken.text}
                </div>
              ))}
            </div>
            <div className={styles.persian}>
              {faraaz.persianTokens.map((persianToken, tokenIndex) => (
                <div
                  key={tokenIndex}
                  className={clsx(styles.token, {
                    [styles.quran]: persianToken.isFromQuran,
                    [styles.highlighted]:
                      faraazIndex === highlightedFaraazIndex &&
                      tokenIndex === highlightedTokenIndex,
                    [styles.playing]: isPlaying(persianToken, currentTime),
                  })}
                  onMouseEnter={() =>
                    tokenMouseEnterHandler(faraazIndex, tokenIndex)
                  }
                  onMouseLeave={() => tokenMouseLeaveHandler()}
                >
                  {persianToken.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function isPlaying(token: Token, currentTime?: number): boolean {
  if (!currentTime || !token.start || !token.end) {
    return false;
  }

  return token.start <= currentTime && currentTime <= token.end;
}
