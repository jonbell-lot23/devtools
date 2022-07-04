import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getAwaitingSourcemaps, getLoadingFinished, getUploading } from "ui/reducers/app";
import { UIState } from "ui/state";
import { LoadingTips } from "./LoadingTips";
import { BubbleViewportWrapper } from "./Viewport";
import ReplayLogo from "./ReplayLogo";
import Spinner from "../shared/Spinner";

export function LoadingScreenTemplate({
  children,
  showTips,
}: {
  children?: ReactNode;
  showTips?: boolean;
}) {
  return (
    <BubbleViewportWrapper>
      <div className="relative flex flex-col items-center p-4 space-y-2 rounded-lg">
        <div className="flex flex-col items-center space-y-2">
          <ReplayLogo wide size="md" />
          {children}
        </div>
      </div>
    </BubbleViewportWrapper>
  );
}

function LoadingScreen({
  uploading,
  awaitingSourcemaps,
  fallbackMessage,
  stalledTimeout = 9000,
}: PropsFromRedux & { fallbackMessage: string; stalledTimeout?: number }) {
  // The backend send events in this order: uploading replay -> uploading sourcemaps.
  let waitingForMessage = <Spinner className="w-4 h-4 text-gray-500 animate-spin" />;

  if (awaitingSourcemaps) {
    waitingForMessage = <span>Uploading sourcemaps...</span>;
    stalledTimeout = Infinity;
  } else if (uploading) {
    waitingForMessage = <span>Uploading {Math.round(+uploading.amount)}Mb</span>;
    stalledTimeout = Infinity;
  }

  let [stalled, setStalled] = useState<boolean>(false);
  useEffect(() => {
    if (stalledTimeout === Infinity) {
      return;
    }

    const timeout = setTimeout(() => setStalled(true), stalledTimeout);

    return () => clearTimeout(timeout);
  }, [fallbackMessage, stalledTimeout]);

  return (
    <LoadingScreenTemplate showTips={true}>
      <div className="flex text-xs">
        <span>{waitingForMessage}</span>
        <span className="ml-2">{stalled ? "Thanks for your patience!" : ""}</span>
      </div>
    </LoadingScreenTemplate>
  );
}

const connector = connect((state: UIState) => ({
  uploading: getUploading(state),
  awaitingSourcemaps: getAwaitingSourcemaps(state),
  finished: getLoadingFinished(state),
}));
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoadingScreen);
