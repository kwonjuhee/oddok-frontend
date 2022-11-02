import React from "react";
import { PageLayout } from "@components/@layouts";
import { KAKAO_AUTH_URL } from "@api/auth/kakao";
import styles from "./Login.module.css";

function Login() {
  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.comment}>
          <span>ODDOK과 함께</span>
          <span>즐거운 화상스터디를</span>
          <span>시작해보세요🚀</span>
        </div>
        <a href={KAKAO_AUTH_URL}>
          <button className={styles.button} type="button">
            카카오로 3초만에 로그인
          </button>
        </a>
      </div>
    </PageLayout>
  );
}

export default Login;
