export function goToPreviousFaraaz(): void {
  const faraazes = findFaraazes();
  const nearestIndex = findNearestFaraazIndex();

  let top: number;
  if (window.scrollY > faraazes[nearestIndex].offsetTop) {
    top = faraazes[nearestIndex].offsetTop;
  } else if (nearestIndex - 1 >= 0) {
    top = faraazes[nearestIndex - 1].offsetTop;
  } else {
    top = 0;
  }

  window.scrollTo({ top });
}

export function goToNextFaraaz(): void {
  const faraazes = findFaraazes();
  const nearestIndex = findNearestFaraazIndex();

  let top: number;
  if (window.scrollY < faraazes[nearestIndex].offsetTop) {
    top = faraazes[nearestIndex].offsetTop;
  } else if (nearestIndex + 1 < faraazes.length) {
    top = faraazes[nearestIndex + 1].offsetTop;
  } else {
    top = document.body.scrollHeight;
  }

  window.scrollTo({ top });
}

export function findFaraazes(): HTMLDivElement[] {
  return [...document.querySelectorAll<HTMLDivElement>("[data-faraaz]")];
}

function findNearestFaraazIndex(): number {
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
}
