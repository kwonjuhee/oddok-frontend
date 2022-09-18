import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";

function PublicRoute({ component, restricted }) {
  const user = useRecoilValue(userState);

  return user.isLogin && restricted ? <Navigate to="/" /> : component;
}

export default PublicRoute;
