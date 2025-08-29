import { useCallback, useEffect } from "react";

import { Dua } from "@/types/dua.type";

import {
  findFaraazes,
  goToNextFaraaz,
  goToPreviousFaraaz,
} from "@/utils/scroller.utils";

type Result = {
  goToPlayingFaraaz: () => void;
};

export default function useScroller(dua: Dua, currentTime: number): Result {
  const findPlayingFaraazIndex = useCallback((): number => {
    return dua.faraazes.findIndex((faraaz) => {
      return faraaz.arabicTokens.some((token) => {
        if (!token.start || !token.end) {
          return false;
        }

        return token.start <= currentTime && currentTime <= token.end;
      });
    });
  }, [currentTime, dua.faraazes]);

  const goToPlayingFaraaz = useCallback((): void => {
    const faraazes = findFaraazes();

    const index = findPlayingFaraazIndex();
    const faraaz = faraazes[index];

    if (!faraaz) {
      return;
    }

    window.scrollTo({ top: faraaz.offsetTop });
  }, [findPlayingFaraazIndex]);

  useEffect(() => {
    const pageUpKeyHandler = (e: KeyboardEvent): void => {
      if (e.code !== "PageUp") {
        return;
      }

      e.preventDefault();
      goToPreviousFaraaz();
    };

    const pageDownKeyHandler = (e: KeyboardEvent): void => {
      if (e.code !== "PageDown") {
        return;
      }

      e.preventDefault();
      goToNextFaraaz();
    };

    document.addEventListener("keydown", pageUpKeyHandler);
    document.addEventListener("keydown", pageDownKeyHandler);

    return () => {
      document.removeEventListener("keydown", pageUpKeyHandler);
      document.removeEventListener("keydown", pageDownKeyHandler);
    };
  }, []);

  return { goToPlayingFaraaz };
}
