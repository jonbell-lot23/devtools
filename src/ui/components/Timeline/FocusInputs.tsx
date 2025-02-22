import React from "react";

import { getFormattedTime } from "shared/utils/time";
import { updateFocusRegion } from "ui/actions/timeline";
import { selectors } from "ui/reducers";
import { useAppDispatch, useAppSelector } from "ui/setup/hooks";
import { getSecondsFromFormattedTime } from "ui/utils/timeline";

import EditableTimeInput from "./EditableTimeInput";
import styles from "./FocusInputs.module.css";

export default function FocusInputs() {
  const dispatch = useAppDispatch();
  const currentTime = useAppSelector(selectors.getCurrentTime);
  const focusRegion = useAppSelector(selectors.getFocusRegion);
  const showFocusModeControls = useAppSelector(selectors.getShowFocusModeControls);
  const recordingDuration = useAppSelector(selectors.getRecordingDuration);

  const formattedDuration = getFormattedTime(recordingDuration || 0);
  const formattedCurrentTime = getFormattedTime(currentTime);

  // Avoid layout shift; keep input size consistent when focus mode toggles.
  const inputSize = formattedDuration.length;

  if (showFocusModeControls && focusRegion !== null) {
    const formattedEndTime = getFormattedTime(focusRegion.end.time);
    const formattedBeginTime = getFormattedTime(focusRegion.begin.time);

    const validateAndSaveBeginTime = async (pending: string) => {
      try {
        const newBeginTime = getSecondsFromFormattedTime(pending);
        if (!isNaN(newBeginTime)) {
          // If the new end time is less than the current start time, the user is probably trying to move the whole range.
          // We can simplify this operation by resetting both the start and end time to the same value.
          const newEndTime =
            newBeginTime <= focusRegion.end.time ? focusRegion.end.time : newBeginTime;

          await dispatch(
            updateFocusRegion({
              begin: newBeginTime,
              end: newEndTime,
            })
          );
        }
      } catch (error) {
        // Ignore
      }
    };
    const validateAndSaveEndTime = async (pending: string) => {
      try {
        const newEndTime = getSecondsFromFormattedTime(pending);
        if (!isNaN(newEndTime)) {
          // If the new start time is greater than the current end time, the user is probably trying to move the whole range.
          // We can simplify this operation by resetting both the start and end time to the same value.
          const newBeginTime =
            newEndTime >= focusRegion.begin.time ? focusRegion.begin.time : newEndTime;

          await dispatch(
            updateFocusRegion({
              begin: newBeginTime,
              end: newEndTime,
            })
          );
        }
      } catch (error) {
        // Ignore
      }
    };

    return (
      <div className={styles.Container} data-test-id="FocusInputs">
        <EditableTimeInput
          className="text-right"
          dataTestId="FocusStartTimeInput"
          defaultValue={formattedBeginTime}
          size={inputSize}
          validateAndSave={validateAndSaveBeginTime}
        />
        <span>/</span>
        <EditableTimeInput
          dataTestId="FocusEndTimeInput"
          defaultValue={formattedEndTime}
          size={inputSize}
          validateAndSave={validateAndSaveEndTime}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.Container} data-test-id="FocusInputs">
        <span
          data-testid="Timeline-CurrentTime"
          className={styles.CurrentTimeLabel}
          style={{ width: `${inputSize}ch` }}
        >
          {formattedCurrentTime}
        </span>
        <span>/</span>
        <span
          data-testid="Timeline-DurationTime"
          className={styles.DurationLabel}
          style={{ width: `${inputSize}ch` }}
        >
          {formattedDuration}
        </span>
      </div>
    );
  }
}
