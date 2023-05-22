import dynamic from "next/dynamic";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";

import { getAwaitingSourcemaps, getUploading } from "ui/reducers/app";
import { UIState } from "ui/state";

import { BubbleViewportWrapper } from "./Viewport";
import styles from "./LoadingScreen.module.css";

const colorOptions: Array<"blue" | "green" | "red"> = ["blue", "green", "red"];

const Hoverboard = dynamic(() => import("./Hoverboard"), {
  ssr: false,
  loading: () => <div />,
});

export function LoadingScreenTemplate({ children }: { children?: ReactNode }) {
  const [hoverboardColor, setHoverboardColor] = useState(colorOptions[2]);

  const changeHoverboardColor = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    setHoverboardColor(colorOptions[randomIndex]);
  }, []);

  useEffect(() => {
    const timeoutId = setInterval(changeHoverboardColor, 5000);
    return () => clearInterval(timeoutId);
  }, [changeHoverboardColor]);

  return (
    <div className={styles.loadingScreenWrapper}>
      <BubbleViewportWrapper>
        <div className={styles.loadingScreenWrapper}>
          <div className="flex flex-col items-center space-y-2">
            <div className={styles.hoverboardWrapper} onClick={changeHoverboardColor}>
              <Hoverboard color={hoverboardColor} />
            </div>
            {children}
          </div>
        </div>
      </BubbleViewportWrapper>
    </div>
  );
}

const phrases = [
  "Tuning the flux capacitor...",
  "Prepping DeLorean for time travel...",
  "Revving up to 88 miles per hour...",
  "Gathering 1.21 gigawatts of power...",
  "Ensuring temporal paradox safeguards...",
  "Being careful not to mess up your timeline...",
];

function LoadingScreen({
  uploading,
  awaitingSourcemaps,
  fallbackMessage,
  stalledTimeout = 15000,
}: PropsFromRedux & { fallbackMessage: string; stalledTimeout?: number }) {
  const longWaitMessage =
    "<div><p>This is taking longer than expected.</p><p><a href='http://replay.io/discord' target='discord'>Contact us on Discord</a></p>";

  const [message, setMessage] = useState(fallbackMessage);

  useEffect(() => {
    const changeMessage = () => {
      const randomIndex = Math.floor(Math.random() * phrases.length);
      setMessage(phrases[randomIndex]);
    };
    const phraseTimeout = setTimeout(changeMessage, 5000);
    // swap to cutesy phrase after 5 seconds
    // note: this should only be called a single time
    return () => clearTimeout(phraseTimeout);
  }, []);

  useEffect(() => {
    const stalledTimeoutId = setTimeout(() => {
      // after 15 seconds, switch to stalled message
      setMessage(longWaitMessage);
    }, stalledTimeout);
    return () => clearTimeout(stalledTimeoutId);
  }, [stalledTimeout]);

  const waitingForMessage =
    awaitingSourcemaps || uploading ? (
      <span>Uploading {Math.round(uploading?.amount ? Number(uploading.amount) : 0)}Mb</span>
    ) : (
      <span dangerouslySetInnerHTML={{ __html: message }}></span>
    );
  return (
    <LoadingScreenTemplate>
      <span className={styles.messageWrapper} dangerouslySetInnerHTML={{ __html: message }}></span>
    </LoadingScreenTemplate>
  );
}

const connector = connect((state: UIState) => ({
  uploading: getUploading(state),
  awaitingSourcemaps: getAwaitingSourcemaps(state),
}));
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoadingScreen);
