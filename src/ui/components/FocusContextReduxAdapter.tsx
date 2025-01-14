import { TimeStampedPointRange } from "@replayio/protocol";
import { PropsWithChildren, useCallback, useDeferredValue, useMemo } from "react";

import { FocusContext, UpdateOptions } from "replay-next/src/contexts/FocusContext";
import { TimeRange } from "replay-next/src/types";
import {
  enterFocusMode,
  setFocusRegionFromTimeRange,
  syncFocusedRegion,
  updateFocusRegionParam,
} from "ui/actions/timeline";
import { getFocusRegion } from "ui/reducers/timeline";
import { useAppDispatch, useAppSelector } from "ui/setup/hooks";
import { rangeForFocusRegion } from "ui/utils/timeline";

// Adapter that reads focus region (from Redux) and passes it to the FocusContext.
export default function FocusContextReduxAdapter({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const focusRegion = useAppSelector(getFocusRegion);

  const deferredFocusRegion = useDeferredValue(focusRegion);
  const isPending = deferredFocusRegion !== focusRegion;

  const update = useCallback(
    async (value: TimeStampedPointRange | null, options: UpdateOptions) => {
      const { sync } = options;

      await dispatch(
        setFocusRegionFromTimeRange(
          value !== null
            ? {
                begin: value.begin.time,
                end: value.end.time,
              }
            : null
        )
      );

      if (sync) {
        await dispatch(syncFocusedRegion());
        dispatch(updateFocusRegionParam());
      }
    },
    [dispatch]
  );

  const updateForTimelineImprecise = useCallback(
    async (value: TimeRange | null, options: UpdateOptions) => {
      const { sync } = options;

      await dispatch(
        setFocusRegionFromTimeRange(
          value !== null
            ? {
                begin: value[0],
                end: value[1],
              }
            : null
        )
      );

      if (sync) {
        await dispatch(syncFocusedRegion());
        dispatch(updateFocusRegionParam());
      }
    },
    [dispatch]
  );

  const context = useMemo(() => {
    return {
      enterFocusMode: () => {
        dispatch(enterFocusMode());
      },
      isTransitionPending: isPending,
      range: deferredFocusRegion ? rangeForFocusRegion(deferredFocusRegion) : null,
      rangeForDisplay: focusRegion ? rangeForFocusRegion(focusRegion) : null,
      update,
      updateForTimelineImprecise,
    };
  }, [deferredFocusRegion, dispatch, isPending, focusRegion, update, updateForTimelineImprecise]);

  return <FocusContext.Provider value={context}>{children}</FocusContext.Provider>;
}
