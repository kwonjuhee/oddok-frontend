import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@components/commons";
import { useSearchHistory, useInput } from "@hooks";
import styles from "./InputForm.module.css";

function InputForm() {
  const navigate = useNavigate();
  const titleRef = useRef();
  const { addHistory } = useSearchHistory();

  const searchTitleHandler = () => {
    if (titleRef.current.value === "") return;
    addHistory(titleRef.current.value);

    navigate({ pathname: "/search/studyroom", search: `?title=${titleRef.current.value}` });
  };

  const { pressEnter } = useInput(titleRef, () => {
    searchTitleHandler();
    titleRef.current.blur();
  });

  return (
    <div className={styles.wrapper}>
      <Input ref={titleRef} onKeyPress={pressEnter} />
    </div>
  );
}

export default InputForm;
