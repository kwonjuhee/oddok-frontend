import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.title}>요청하신 페이지를 찾을 수 없습니다.</div>
      <button
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        메인으로 돌아가기🏠
      </button>
    </div>
  );
}

export default NotFoundPage;
