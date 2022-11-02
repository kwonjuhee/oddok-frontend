import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { useGoToPage, useModal } from "@hooks";
import { UserCount, PasswordModal } from "@components/@commons";
import { getTotalParticipant } from "@api/participant-api";
import styles from "./TotalParticipant.module.css";

function TotalParticipant() {
  const [totalParticipant, setTotalParticipant] = useState(0);

  const bookmark = useRecoilValue(bookmarkState);
  const { currentUsers, id, isPublic } = bookmark ?? {};

  const { goToCreate, goToSetting } = useGoToPage();
  const { isModal, openModal, closeModal } = useModal();

  useEffect(() => {
    getTotalParticipant()
      .then((response) => setTotalParticipant(response.data))
      .catch((error) => console.error(error));
  }, []);

  const clickStartBtn = () => {
    if (isPublic) goToSetting(id);
    else openModal();
  };

  return (
    <>
      {isModal && <PasswordModal roomId={id} onClose={closeModal} />}
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.count_icon}>
            <UserCount number={bookmark ? currentUsers : totalParticipant} />
          </div>
          <span>
            {bookmark ? `스터디원 ${currentUsers}명이 공부중이에요` : `${totalParticipant}명이 ODDOK에서 공부중이에요`}
          </span>
        </div>
        <button type="button" onClick={bookmark ? clickStartBtn : goToCreate}>
          {bookmark ? "바로 스터디 시작하기" : "ODDOK과 함께 스터디 시작하기"}
        </button>
      </div>
    </>
  );
}

export default TotalParticipant;
