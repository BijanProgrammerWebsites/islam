export type RawDua = {
  audioSource: string;
  faraazes: {
    arabic: string;
    persian: string;
    timestamps?: [number, number];
    isFromQuran?: boolean;
  }[][];
};
