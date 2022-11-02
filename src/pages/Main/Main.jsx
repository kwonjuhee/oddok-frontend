import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { PageLayout } from "@components/@layouts";
import { Bookmark, StudyRoomCardList, TotalParticipant } from "@components/main";
import styles from "./Main.module.css";

function Main() {
  const user = useRecoilValue(userState);

  return (
    <PageLayout>
      <main className={styles.main}>
        <TotalParticipant />
        {user.isLogin && <Bookmark />}
        <section>
          <h2>STUDY ROOM</h2>
          <StudyRoomCardList />
        </section>
      </main>
    </PageLayout>
  );
}

export default Main;
