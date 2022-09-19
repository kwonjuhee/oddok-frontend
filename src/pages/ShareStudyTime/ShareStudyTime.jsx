import React from "react";
import { CloseButton, ShareButton } from "@components/share";
import { StudyHistorySection } from "@components/mypage";
import styles from "./ShareStudyTime.module.css";

function ShareStudyTime() {
  return (
    <div className={styles.share_page}>
      <CloseButton />
      <StudyHistorySection />
      <ShareButton />
    </div>
  );
}

export default ShareStudyTime;
