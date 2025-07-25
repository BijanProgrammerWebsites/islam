import { ReactNode, useRef } from "react";

import styles from "./audio-manager.module.css";

type Props = {
  src: string;
  onCurrentTimeChange: (time: number) => void;
};

export default function AudioManagerComponent({
  src,
  onCurrentTimeChange,
}: Props): ReactNode {
  const audioRef = useRef<HTMLAudioElement>(null);

  const timeUpdateHandler = (): void => {
    onCurrentTimeChange(audioRef.current!.currentTime);
  };

  const backToTopButtonClickHandler = (): void => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={styles["audio-manager"]}>
      <audio
        ref={audioRef}
        src={src}
        controls
        muted
        preload="metadata"
        onTimeUpdate={timeUpdateHandler}
      />
      <button
        className="secondary back-to-top"
        onClick={backToTopButtonClickHandler}
      >
        بازگشت به ابتدای صفحه
      </button>
    </div>
  );
}
