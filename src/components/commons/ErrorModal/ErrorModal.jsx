import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { errorState } from "@recoil/error-state";
import { Modal } from "@components/commons";

function ErrorModal() {
  const navigate = useNavigate();
  const [error, setError] = useRecoilState(errorState);

  const handleClose = () => {
    setError(null);
  };

  const redirect = (path) => {
    setError(null);
    navigate(path);
  };

  return (
    error && (
      <Modal
        title="⚠️"
        content={error.userMessage ?? error.message}
        onClose={handleClose}
        onAction={{
          text: error.action?.text ?? "메인으로 이동하기",
          action: () => redirect(error.action?.path ?? "/"),
        }}
      />
    )
  );
}

export default ErrorModal;
