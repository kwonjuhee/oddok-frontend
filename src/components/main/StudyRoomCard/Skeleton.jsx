import React from "react";
import styles from "./Skeleton.module.css";

function Skeleton() {
  return (
    <li>
      <div className={styles.thumbnail}>
        <div className={styles.shimmer} />
      </div>
      <div className={styles.title}>
        <div className={styles.shimmer} />
      </div>
      <div className={styles.hashtag}>
        <div className={styles.shimmer} />
      </div>
    </li>
  );
}

export default Skeleton;
