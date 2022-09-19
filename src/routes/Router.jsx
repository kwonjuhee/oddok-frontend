import { Routes, Route } from "react-router-dom";
import CreateRoom from "@pages/CreateRoom";
import JoinRoom from "@pages/JoinRoom";
import Main from "@pages/Main/Main";
import Login from "@pages/Login/Login";
import Search from "@pages/Search/Search";
import MyPage from "@pages/MyPage/MyPage";
import StudyRoom from "@pages/StudyRoom/StudyRoom";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import RedirectPage from "@pages/Login/RedirectPage";
import LogoutRedirectPage from "@pages/LogoutRedirectPage/LogoutRedirectPage";
import ShareStudyTime from "@pages/ShareStudyTime/ShareStudyTime";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/search/*" element={<Search />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth2/code/kakao" element={<RedirectPage />} />
        <Route path="/logout/oauth2/code/kakao" element={<LogoutRedirectPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/studyroom/create" element={<CreateRoom />} />
        <Route path="/studyroom/:roomId/setting" element={<JoinRoom />} />
        <Route path="/studyroom/:roomId" element={<StudyRoom />} />
        <Route path="/share/study-time" element={<ShareStudyTime />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
