import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { bookmarkState } from "@recoil/bookmark-state";
import { getBookmark } from "@api/bookmark-api";
import { Thumbnail } from "@components/@commons";
import styles from "./Bookmark.module.css";

const initialUsers = [
  { id: 1, nickname: null, joinTime: null, isActive: false },
  { id: 2, nickname: null, joinTime: null, isActive: false },
  { id: 3, nickname: null, joinTime: null, isActive: false },
  { id: 4, nickname: null, joinTime: null, isActive: false },
  { id: 5, nickname: null, joinTime: null, isActive: false },
];

function Bookmark() {
  const [bookmark, setBookmark] = useRecoilState(bookmarkState);
  const { currentUsers, endAt, hashtags, limitUsers, name, participant, rule } = bookmark ?? {};

  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    getBookmark()
      .then((response) => setBookmark(response))
      .catch((error) => console.error(error));
  }, []);

  // 북마크한 스터디룸의 현재 참여자 리스트
  useEffect(() => {
    if (!bookmark || !participant) return;

    const updatedUsers = [...users];
    for (let i = 0; i < users.length; i += 1) {
      if (!participant[i]) {
        updatedUsers[i] = { ...users[i], nickname: null, joinTime: null, isActive: false };
      } else {
        const nickname = participant[i].nickname;
        const joinTime = participant[i].joinTime.split(/[T, .]/)[1];
        updatedUsers[i] = { ...users[i], nickname, joinTime, isActive: true };
      }
    }
    setUsers(updatedUsers);
  }, [bookmark]);

  if (!bookmark) return null;

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.thumbnail}>
        <Thumbnail />
      </div>
      <div className={styles.detail_box}>
        <h3>{name}</h3>
        <p>
          <span className={styles.label}>해시태그</span>
          {hashtags ? (
            hashtags.map((hashtag) => (
              <span key={hashtag} className={styles.content}>
                #{hashtag}&nbsp;
              </span>
            ))
          ) : (
            <span className={styles.content}>없음</span>
          )}
        </p>
        <p>
          <span className={styles.label}>인원</span>
          <span className={styles.content}>
            {currentUsers}명 / {limitUsers}명
          </span>
        </p>
        <p>
          <span className={styles.label}>기간</span>
          <span className={styles.content}>{endAt ? `${endAt}까지` : "없음"}</span>
        </p>
        <p className={styles.content_rule}>
          <span className={styles.label}>스터디규칙</span>
          {rule ?? "없음"}
        </p>
      </div>
      <ul className={styles.ranking}>
        {users.map((user) => (
          <li key={user.id} className={user.isActive ? styles.active : ""}>
            <div className={styles.nickname}>
              <span>{user.id}.&nbsp;</span>
              <span>{user.nickname ?? "현재 스터디원"}</span>
            </div>
            <span className={styles.time}>{user.isActive ? `${user.joinTime} ~ 지금까지` : "없음"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookmark;
