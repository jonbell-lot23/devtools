import camelCase from "lodash/camelCase";
import React, { ReactNode, Suspense, useContext, useMemo } from "react";
import { isPromiseLike } from "suspense";

import { Badge, Checkbox } from "design";
import Icon from "replay-next/components/Icon";
import { ConsoleFiltersContext } from "replay-next/src/contexts/ConsoleFiltersContext";
import { FocusContext } from "replay-next/src/contexts/FocusContext";
import { SessionContext } from "replay-next/src/contexts/SessionContext";
import { recordingCapabilitiesCache } from "replay-next/src/suspense/BuildIdCache";
import { exceptionsCache } from "replay-next/src/suspense/ExceptionsCache";
import { CategoryCounts, getMessagesSuspense } from "replay-next/src/suspense/MessagesCache";
import { isInNodeModules } from "replay-next/src/utils/messages";
import { ReplayClientContext } from "shared/client/ReplayClientContext";
import { ProtocolError, isCommandError } from "shared/utils/error";

import EventsList from "./EventsList";
import styles from "./FilterToggles.module.css";

export default function FilterToggles() {
  const {
    showErrors,
    showExceptionsForDisplay: showExceptions,
    showLogs,
    showNodeModules,
    showTimestamps,
    showWarnings,
    update,
  } = useContext(ConsoleFiltersContext);
  const { trackEvent } = useContext(SessionContext);
  const replayClient = useContext(ReplayClientContext);
  const recordingCapabilities = recordingCapabilitiesCache.read(replayClient);

  const onShowErrorsChange = (showErrors: boolean) => {
    trackEvent("console.settings.toggle_errors");
    update({ showErrors });
  };

  const onShowExceptionsChange = (showExceptions: boolean) => {
    trackEvent("console.settings.toggle_log_exceptions");
    update({ showExceptions });
  };

  const onShowLogsChange = (showLogs: boolean) => {
    trackEvent("console.settings.toggle_logs");
    update({ showLogs });
  };

  const onShowNodeModulesChange = (showNodeModules: boolean) => {
    trackEvent("console.settings.toggle_node_modules");
    update({ showNodeModules });
  };

  const onShowTimestampsChange = (showTimestamps: boolean) => {
    trackEvent("console.settings.toggle_timestamp");
    update({ showTimestamps });
  };

  const onShowWarningsChange = (showWarnings: boolean) => {
    trackEvent("console.settings.toggle_warnings");
    update({ showWarnings });
  };

  return (
    <div className={styles.Filters} data-test-id="ConsoleFilterToggles">
      <Toggle
        afterContent={
          <Suspense fallback={<Icon className={styles.SpinnerIcon} type="spinner" />}>
            <ExceptionsBadgeSuspends />
          </Suspense>
        }
        checked={showExceptions}
        label="Exceptions"
        onChange={onShowExceptionsChange}
      />
      <Toggle
        afterContent={
          <Suspense fallback={null}>
            <ToggleCategoryCount category="logs" />
          </Suspense>
        }
        checked={showLogs}
        label="Logs"
        onChange={onShowLogsChange}
      />
      <Toggle
        afterContent={
          <Suspense fallback={null}>
            <ToggleCategoryCount category="warnings" />
          </Suspense>
        }
        checked={showWarnings}
        label="Warnings"
        onChange={onShowWarningsChange}
      />
      <Toggle
        afterContent={
          <Suspense fallback={null}>
            <ToggleCategoryCount category="errors" />
          </Suspense>
        }
        checked={showErrors}
        label="Errors"
        onChange={onShowErrorsChange}
      />
      {recordingCapabilities.supportsEventTypes && (
        <>
          <hr className={styles.Divider} />
          <EventsList />
        </>
      )}
      <div className={styles.EmptySpaceFiller} />
      <hr className={styles.Divider} />

      <Toggle
        afterContent={
          <Suspense fallback={null}>
            <NodeModulesCount />
          </Suspense>
        }
        checked={showNodeModules}
        label="Node modules"
        onChange={onShowNodeModulesChange}
      />
      <Toggle checked={showTimestamps} label="Timestamps" onChange={onShowTimestampsChange} />
    </div>
  );
}

function Toggle({
  afterContent = null,
  checked,
  label,
  onChange,
}: {
  afterContent?: ReactNode | null;
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  const id = `FilterToggle-${camelCase(label)}`;
  return (
    <div className={styles.Filter}>
      <Checkbox
        data-test-id={id}
        label={label}
        checked={checked}
        id={id}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
      />
      {afterContent}
    </div>
  );
}

function ToggleCategoryCount({ category }: { category: keyof CategoryCounts }) {
  const { range: focusRange } = useContext(FocusContext);
  const client = useContext(ReplayClientContext);
  const { endpoint } = useContext(SessionContext);

  const { didError, categoryCounts } = getMessagesSuspense(client, focusRange, endpoint);
  const count = categoryCounts[category];

  if (didError) {
    return (
      <span title="Something went wrong loading message counts.">
        <Icon className={styles.ExceptionsErrorIcon} type="warning" />
      </span>
    );
  } else if (count > 0) {
    return <Badge label={count} />;
  } else {
    return null;
  }
}

function NodeModulesCount() {
  const client = useContext(ReplayClientContext);
  const { range } = useContext(FocusContext);
  const { endpoint } = useContext(SessionContext);

  const { didError, messages } = getMessagesSuspense(client, range, endpoint);

  const count = useMemo(() => {
    return messages ? messages.filter(message => isInNodeModules(message)).length : 0;
  }, [messages]);

  if (didError) {
    return (
      <span title="Something went wrong loading message counts.">
        <Icon className={styles.ExceptionsErrorIcon} type="warning" />
      </span>
    );
  } else if (count > 0) {
    return <Badge label={count} />;
  } else {
    return null;
  }
}

function ExceptionsBadgeSuspends() {
  const replayClient = useContext(ReplayClientContext);
  const { rangeForDisplay: focusRange } = useContext(FocusContext);
  const { showExceptionsForDisplay: showExceptions } = useContext(ConsoleFiltersContext);

  if (!focusRange || !showExceptions) {
    return null;
  }

  try {
    exceptionsCache.pointsIntervalCache.read(
      BigInt(focusRange.begin.point),
      BigInt(focusRange.end.point),
      replayClient
    );
  } catch (errorOrPromise) {
    if (isPromiseLike(errorOrPromise)) {
      throw errorOrPromise;
    }

    let title: string;
    if (
      isCommandError(errorOrPromise, ProtocolError.TooManyPoints) ||
      (errorOrPromise instanceof Error &&
        errorOrPromise.message === "Too many points to run analysis")
    ) {
      title = "There are too many exceptions. Please focus to a smaller time range and try again.";
    } else {
      title = "Failed to fetch exceptions.";
    }

    return (
      <span title={title}>
        <Icon className={styles.ExceptionsErrorIcon} type="warning" />
      </span>
    );
  }

  return null;
}
