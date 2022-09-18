import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRoom from "@pages/CreateRoom";
import JoinRoom from "@pages/JoinRoom";
import MainHome from "@pages/MainHome/MainHome";
import Login from "@pages/Login/Login";
import Search from "@pages/Search/Search";

import MyPage from "@pages/MyPage/MyPage";
import StudyRoom from "@pages/StudyRoom/StudyRoom";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import RedirectPage from "@pages/Login/RedirectPage";
import LogoutRedirectPage from "@pages/LogoutRedirectPage/LogoutRedirectPage";
import ShareStudyTime from "@pages/ShareStudyTime/ShareStudyTime";
import { ErrorModal } from "@components/commons";
import { PrivateRoute, PublicRoute } from "@components/router";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <ErrorModal />
        <Routes>
          <Route path="/" element={<PublicRoute component={<MainHome />} />} />
          <Route path="/login" element={<PublicRoute restricted component={<Login />} />} />
          <Route path="/login/oauth2/code/kakao" element={<PublicRoute restricted component={<RedirectPage />} />} />
          <Route path="/logout/oauth2/code/kakao" element={<PrivateRoute component={<LogoutRedirectPage />} />} />
          <Route path="/search/*" element={<Search />} />
          <Route path="/mypage" element={<PrivateRoute component={<MyPage />} />} />
          <Route path="/studyroom/create" element={<PrivateRoute component={<CreateRoom />} />} />
          <Route path="/studyroom/:roomId/setting" element={<PrivateRoute component={<JoinRoom />} />} />
          <Route path="/studyroom/:roomId" element={<PrivateRoute component={<StudyRoom />} />} />
          <Route path="/share/study-time" element={<PrivateRoute component={<ShareStudyTime />} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
