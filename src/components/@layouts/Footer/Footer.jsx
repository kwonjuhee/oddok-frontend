import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.title}>
          <span className={styles.logo}>ODDOK</span>
          <span>실시간 화상 스터디 서비스</span>
        </div>
        <div className={styles.detail}>
          <div>
            <span className={styles.label}>Contact</span>
            <span>yejin013@naver.com</span>
          </div>
          <div>
            <span className={styles.label}>Team</span>
            <span>DOBBY @숭실대학교 소프트웨어학부</span>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <span>Copyright Dobby 2022, All Rights Reserved.</span>
      </div>
    </footer>
  );
}
export default Footer;
