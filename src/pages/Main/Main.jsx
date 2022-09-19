import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { bookmarkState } from "@recoil/bookmark-state";
import { getBookmark } from "@api/bookmark-api";
import { Layout } from "@components/@layouts";
import { Bookmark, StudyRoomCardList, TotalParticipant } from "@components/main";
import styles from "./Main.module.css";

function Main() {
  const user = useRecoilValue(userState);
  const [bookmark, setBookmark] = useRecoilState(bookmarkState);

  useEffect(() => {
    if (!user.isLogin) {
      return;
    }
    getBookmark()
      .then((response) => setBookmark(response))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Layout>
      <main className={styles.main}>
        {!bookmark ? <TotalParticipant /> : <Bookmark bookmark={bookmark} />}
        <section className={styles.studyroom_list}>
          <h2>STUDY ROOM</h2>
          <StudyRoomCardList />
        </section>
      </main>
    </Layout>
  );
}

export default Main;
