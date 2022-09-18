import React from "react";
import { useNavigate } from "react-router-dom";
import { HashtagList, SearchHistory } from "..";
import styles from "./SearchBrowse.module.css";

function SearchBrowse() {
  const navigate = useNavigate();

  const searchHashtag = (e) => {
    navigate({ pathname: "/search/studyroom", search: `?hastag=${e.target.value}` });
  };

  const searchTitle = (text) => {
    navigate({ pathname: "/search/studyroom", search: `?title=${text}` });
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>인기 태그</h3>
        <HashtagList onToggle={searchHashtag} />
      </div>
      <SearchHistory searchTitle={searchTitle} />
    </div>
  );
}

export default SearchBrowse;
