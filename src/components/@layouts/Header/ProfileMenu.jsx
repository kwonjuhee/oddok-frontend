import React from "react";
import { KAKAO_LOGOUT_URL } from "@api/auth/kakao";
import styles from "./ProfileMenu.module.css";

function ProfileMenu({ clickNicknameEditBtn }) {
  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <button type="button" onClick={clickNicknameEditBtn}>
          닉네임 수정
        </button>
      </li>
      <li className={styles.item}>
        <a href={KAKAO_LOGOUT_URL}>로그아웃</a>
      </li>
    </ul>
  );
}

export default ProfileMenu;
