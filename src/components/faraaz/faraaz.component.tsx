import { ReactNode, use } from "react";

import clsx from "clsx";

import { HighlightContext } from "@/context/highlight.context";

import { Faraaz } from "@/types/faraaz.type";
import { Token } from "@/types/token.type";

import styles from "./faraaz.module.css";

type ChizProps = {
  language: "arabic" | "persian";
  faraaz: Faraaz;
  faraazIndex: number;
  currentTime: number;
};

export default function FaraazComponent({
  language,
  faraaz,
  faraazIndex,
  currentTime,
}: ChizProps): ReactNode {
  const {
    highlightedFaraazIndex,
    highlightedTokenIndex,
    tokenMouseEnterHandler,
    tokenMouseLeaveHandler,
  } = use(HighlightContext);

  const tokens = faraaz[`${language}Tokens`];

  return (
    <div className={clsx(styles.faraaz, styles[language])}>
      {tokens.map((token, tokenIndex) => (
        <span
          key={tokenIndex}
          className={clsx(styles.token, {
            [styles.quran]: token.isFromQuran,
            [styles.highlighted]:
              faraazIndex === highlightedFaraazIndex &&
              tokenIndex === highlightedTokenIndex,
            [styles.playing]: isPlaying(token, currentTime),
          })}
          onMouseEnter={() => tokenMouseEnterHandler(faraazIndex, tokenIndex)}
          onMouseLeave={() => tokenMouseLeaveHandler()}
        >
          {token.text}
          {!token.isFromQuran && ` `}
        </span>
      ))}
    </div>
  );
}

function isPlaying(token: Token, currentTime?: number): boolean {
  if (!currentTime || !token.start || !token.end) {
    return false;
  }

  return token.start <= currentTime && currentTime <= token.end;
}
