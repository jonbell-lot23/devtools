import React, { useState } from "react";

import Icon from "replay-next/components/Icon";
import useLocalStorage from "replay-next/src/hooks/useLocalStorage";
import { setViewMode } from "ui/actions/layout";
import { setSelectedPrimaryPanel } from "ui/actions/layout";
import Events from "ui/components/Events";
import { shouldShowDevToolsNag } from "ui/components/Header/ViewToggle";
import Confetti from "ui/components/shared//Confetti";
import hooks from "ui/hooks";
import { Nag } from "ui/hooks/users";
import { useDismissNag } from "ui/hooks/users";
import { UserInfo } from "ui/hooks/users";
import { useTestInfo } from "ui/hooks/useTestInfo";
import { getViewMode } from "ui/reducers/layout";
import { useAppDispatch, useAppSelector } from "ui/setup/hooks";
import { ViewMode } from "ui/state/layout";
import {
  shouldShowAddComment,
  shouldShowAddCommentToLine,
  shouldShowAddCommentToNetworkRequest,
  shouldShowAddCommentToPrintStatement,
  shouldShowAddUnicornBadge,
  shouldShowBreakpointAdd,
  shouldShowBreakpointEdit,
  shouldShowConsoleNavigate,
  shouldShowExploreSources,
  shouldShowInspectComponent,
  shouldShowInspectElement,
  shouldShowJumpToCode,
  shouldShowJumpToEvent,
  shouldShowLaunchCommandPalette,
  shouldShowQuickOpenFile,
  shouldShowRecordReplay,
  shouldShowSearchSourceText,
  shouldShowTour,
  shouldShowUseFocusMode,
} from "ui/utils/onboarding";

import styles from "./Assist.module.css";

const useNagDismissal = () => {
  const dismissNag = useDismissNag();
  const dispatch = useAppDispatch();
  const info = useTestInfo();

  const dismissTourNag = () => {
    const initialPrimaryPanel = "events";
    dispatch(setSelectedPrimaryPanel(initialPrimaryPanel));
    dismissNag(Nag.DISMISS_TOUR);
  };

  return { dismissTourNag };
};

const Assist: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const { nags } = hooks.useGetUserInfo();
  const viewMode = useAppSelector(getViewMode);
  const showDevtoolsNag = shouldShowDevToolsNag(nags, viewMode);
  const showConsoleNavigate = shouldShowConsoleNavigate(nags);
  const showBreakpointAdd = shouldShowBreakpointAdd(nags);
  const showBreakpointEdit = shouldShowBreakpointEdit(nags);
  const showAddComment = shouldShowAddComment(nags);
  const showAddCommentToLine = shouldShowAddCommentToLine(nags);
  const showAddCommentToNetworkRequest = shouldShowAddCommentToNetworkRequest(nags);
  const showAddCommentToPrintStatement = shouldShowAddCommentToPrintStatement(nags);
  const showJumpToCode = shouldShowJumpToCode(nags);
  const showAddUnicornBadge = shouldShowAddUnicornBadge(nags);
  const showRecordReplay = shouldShowRecordReplay(nags);
  const showExploreSources = shouldShowExploreSources(nags);
  const showSearchSourceText = shouldShowSearchSourceText(nags);
  const showQuickOpenFile = shouldShowQuickOpenFile(nags);
  const showLaunchCommandPalette = shouldShowLaunchCommandPalette(nags);
  const showJumpToEvent = shouldShowJumpToEvent(nags);
  const showInspectElement = shouldShowInspectElement(nags);
  const showInspectComponent = shouldShowInspectComponent(nags);
  const showUseFocusMode = shouldShowUseFocusMode(nags);

  const [showConfetti, setShowConfetti] = useState(false);

  const info = useTestInfo();

  const [videoUrl, setVideoUrl] = useState(
    "https://website-git-master-recordreplay.vercel.app/assist/time_travel_in_console.gif"
  );

  const renderCheckmarkIcon = (completed: boolean | undefined) => {
    if (completed === false) {
      return "checked-rounded";
    }
    return "unchecked-rounded";
  };

  const handleClick = (index: number) => {
    setSelectedItem(index);

    if (index === 0) {
      setVideoUrl("https://website-git-master-recordreplay.vercel.app/assist/open_devtools.gif");
    } else if (index === 1) {
      setVideoUrl(
        "https://website-git-master-recordreplay.vercel.app/assist/time_travel_in_console.gif"
      );
    } else if (index === 2) {
      setVideoUrl(
        "https://website-git-master-recordreplay.vercel.app/assist/set_print_statement.gif"
      );
    } else if (index === 3) {
      setVideoUrl("https://website-git-master-recordreplay.vercel.app/assist/add_a_comment.gif");
    } else if (index === 4) {
      setVideoUrl(
        "https://website-git-master-recordreplay.vercel.app/assist/add_a_comment_to_code.gif"
      );
    } else if (index === 5) {
      setVideoUrl(
        "https://website-git-master-recordreplay.vercel.app/assist/add_a_comment_to_network_request.gif"
      );
    } else if (index === 6) {
      setVideoUrl(
        "https://website-git-master-recordreplay.vercel.app/assist/add_a_comment_to_print_statement.gif"
      );
    } else if (index === 7) {
      setVideoUrl("https://website-git-master-recordreplay.vercel.app/assist/jump_to_code.gif");
    } else if (index === 8) {
      setVideoUrl("https://website-git-master-recordreplay.vercel.app/assist/unicorn_badge.gif");
    } else if (index === 9) {
      setVideoUrl("https://website-git-master-recordreplay.vercel.app/assist/record_a_replay.gif");
    } else if (index === 10) {
      setVideoUrl("https://website-git-master-recordreplay.vercel.app/assist/explore_sources.gif");
    } else if (index === 11) {
      setVideoUrl(
        "https://website-git-master-recordreplay.vercel.app/assist/quick_open_a_file.gif"
      );
    } else if (index === 12) {
      setVideoUrl(
        "https://website-git-master-recordreplay.vercel.app/assist/launch_command_palette.gif"
      );
    } else if (index === 13) {
      setVideoUrl("https://website-git-master-recordreplay.vercel.app/assist/jump_to_an_event.gif");
    } else if (index === 14) {
      setVideoUrl(
        "https://website-git-master-recordreplay.vercel.app/assist/inspect_an_element.gif"
      );
    } else if (index === 15) {
      setVideoUrl(
        "https://website-git-master-recordreplay.vercel.app/assist/inspect_an_component.gif"
      );
    } else if (index === 16) {
      setVideoUrl("https://website-git-master-recordreplay.vercel.app/assist/use_focus_mode.gif");
    }
  };

  const getItemStyle = (index: number) => {
    return selectedItem === index ? styles.selectedItem : "";
  };

  const renderVideoPlaceholder = () => {
    if (selectedItem >= 0) {
      return <div>Video #{selectedItem + 1} would go here</div>;
    }
    return null;
  };

  /*
  const renderClickInfo = () => {
    if (selectedItem >= 0) {
      return <div className={styles.clickInfo}>You clicked on {checklistItems[selectedItem]}</div>;
    }
    return null;
  };
  */

  console.log("still need to navigate a console: ", showConsoleNavigate);
  console.log("still need to edit a breakpoint: ", showBreakpointEdit);
  console.log("still need to AddComment: ", showAddComment);
  console.log("still need to JumpToCode: ", showJumpToCode);
  console.log("still need to AddUnicornBadge: ", showAddUnicornBadge);
  console.log("still need to RecordReplay: ", showRecordReplay);
  console.log("still need to ExploreSources: ", showExploreSources);
  console.log("still need to SearchSourceText: ", showSearchSourceText);
  console.log("still need to QuickOpenFile: ", showQuickOpenFile);
  console.log("still need to LaunchCommandPalette: ", showLaunchCommandPalette);
  console.log("still need to JumpToEvent: ", showJumpToEvent);
  console.log("still need to InspectElement: ", showInspectElement);
  console.log("still need to InspectComponent: ", showInspectComponent);
  console.log("still need to UseFocusMode: ", showUseFocusMode);

  // Hard-coded checklist items
  const checklistItems = [
    {
      label: "Time travel in the console",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video2.gif",
      completed: showConsoleNavigate,
    },
    {
      label: "Magic print statements",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video3.gif",
      completed: showBreakpointEdit,
    },
    {
      label: "Add a comment",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video4.gif",
      completed: showAddComment,
    },
    {
      label: "Jump to code",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video8.gif",
      completed: showJumpToCode,
    },
    {
      label: "Add a unicorn badge",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video9.gif",
      completed: showAddUnicornBadge,
    },

    {
      label: "Use focus mode",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video18.gif",
      completed: showUseFocusMode,
    },
    {
      label: "Launch command palette",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video14.gif",
      completed: showLaunchCommandPalette,
    },
    {
      label: "Record a replay",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video10.gif",
      completed: showRecordReplay,
    },
    {
      label: "Explore sources",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video11.gif",
      completed: showExploreSources,
    },
    {
      label: "Search source text",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video12.gif",
      completed: showSearchSourceText,
    },
    {
      label: "Jump to event",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video15.gif",
      completed: showJumpToEvent,
    },
    {
      label: "Inspect element",
      videoUrl: "https://website-git-master-recordreplay.vercel.app/assist/video16.gif",
      completed: showInspectElement,
    },
  ];

  return (
    <div className={styles.AssistBoxWrapper}>
      <div className={styles.AssistBoxGradient}>
        <div className={styles.AssistBox}>
          <div className="p-0 pt-3">
            <div className={styles.h1}>Replay Assist</div>
            <div className={styles.AssistBoxInternal}>
              <div className={styles.checklist}>
                {checklistItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex ${getItemStyle(index)} ${styles.checklistItem}`}
                    onClick={() => handleClick(index)}
                  >
                    <Icon className={styles.stepIcon} type={renderCheckmarkIcon(item.completed)} />

                    <span className="ml-2">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 w-full px-2">
          <img src={videoUrl} className={styles.videoExample} />
        </div>
      </div>
    </div>
  );
};

export default Assist;
