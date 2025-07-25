"use client";

import { PropsWithChildren, ReactNode, useState } from "react";

import { HighlightContext } from "@/context/highlight.context";

type Props = PropsWithChildren;

export default function HighlightProvider({ children }: Props): ReactNode {
  const [highlightedFaraazIndex, setHighlightedFaraazIndex] = useState<
    number | null
  >(null);

  const [highlightedTokenIndex, setHighlightedTokenIndex] = useState<
    number | null
  >(null);

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

  return (
    <HighlightContext.Provider
      value={{
        highlightedFaraazIndex,
        highlightedTokenIndex,
        tokenMouseEnterHandler,
        tokenMouseLeaveHandler,
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
}
