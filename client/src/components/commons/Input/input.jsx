/* eslint-disable arrow-body-style */
import React, { forwardRef, useImperativeHandle } from "react";

import styles from "./input.module.css";

const Input = forwardRef(({ type, placeholder, maxLength, onChange, isInvalid, disabled }, inputRef) => {
  return (
    <div className={`${styles.container} ${!isInvalid ? "" : styles.invalid}`}>
      <input
        type={type || "text"}
        ref={inputRef}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
});

export default Input;
