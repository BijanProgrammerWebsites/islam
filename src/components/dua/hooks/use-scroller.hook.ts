import { useCallback, useEffect } from "react";

import styles from "@/components/dua/dua.module.css";

import { Dua } from "@/types/dua.type";

type Result = {
  goToPlayingFaraaz: () => void;
};

export default function useScroller(
  dua: Dua,
  currentTime: number,
  parent: HTMLElement | null,
): Result {
  const findFaraazes = useCallback(() => {
    const nodes = parent?.querySelectorAll<HTMLDivElement>(styles.faraaz);
    return [...(nodes ?? [])];
  }, [parent]);

  const goToPlayingFaraaz = (): void => {
    const faraazes = findFaraazes();

    const index = findPlayingFaraazIndex();
    const faraaz = faraazes[index];

    if (!faraaz) {
      return;
    }

    window.scrollTo({ top: faraaz.offsetTop });
  };

  const findNearestFaraazIndex = useCallback((): number => {
    const faraazes = findFaraazes();

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
  }, [findFaraazes]);

  const goToPreviousFaraaz = useCallback((): void => {
    const faraazes = findFaraazes();

    const nearestIndex = findNearestFaraazIndex();

    if (window.scrollY > faraazes[nearestIndex].offsetTop) {
      window.scrollTo({ top: faraazes[nearestIndex].offsetTop });
    } else if (nearestIndex - 1 >= 0) {
      window.scrollTo({ top: faraazes[nearestIndex - 1].offsetTop });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [findFaraazes, findNearestFaraazIndex]);

  const goToNextFaraaz = useCallback((): void => {
    const faraazes = findFaraazes();

    const nearestIndex = findNearestFaraazIndex();

    if (window.scrollY < faraazes[nearestIndex].offsetTop) {
      window.scrollTo({ top: faraazes[nearestIndex].offsetTop });
    } else if (nearestIndex + 1 < faraazes.length) {
      window.scrollTo({ top: faraazes[nearestIndex + 1].offsetTop });
    } else {
      window.scrollTo({ top: document.body.scrollHeight });
    }
  }, [findFaraazes, findNearestFaraazIndex]);

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
  }, [goToNextFaraaz, goToPreviousFaraaz]);

  return { goToPlayingFaraaz };
}
