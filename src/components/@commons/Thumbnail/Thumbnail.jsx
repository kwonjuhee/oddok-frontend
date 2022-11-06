import React from "react";
import thumbnail from "../../../assets/images/thumbnail.png";
import styles from "./Thumbnail.module.css";

function Thumbnail({ children }) {
  return (
    <div className={styles.wrapper}>
      <img src={thumbnail} alt="thumbnail" />
      {children}
    </div>
  );
}

export default Thumbnail;
