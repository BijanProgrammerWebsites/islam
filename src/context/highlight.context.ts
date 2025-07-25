import { createContext } from "react";

type ContextValue = {
  highlightedFaraazIndex: number | null;
  highlightedTokenIndex: number | null;
  tokenMouseEnterHandler: (faraazIndex: number, tokenIndex: number) => void;
  tokenMouseLeaveHandler: () => void;
};

export const HighlightContext = createContext<ContextValue>({
  highlightedFaraazIndex: null,
  highlightedTokenIndex: null,
  tokenMouseEnterHandler: () => {},
  tokenMouseLeaveHandler: () => {},
});
