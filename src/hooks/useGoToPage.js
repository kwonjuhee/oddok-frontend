import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function useGoToPage() {
  const navigate = useNavigate();

  const goToMain = useCallback(() => navigate("/"), []);

  const goToLogin = useCallback(() => navigate("/login"), []);

  const goToSearch = useCallback(() => navigate("/search"), []);

  const goToMyPage = useCallback(() => navigate("/mypage"), []);

  const goToCreate = useCallback(() => navigate("/studyroom/create"), []);

  const goToSetting = useCallback((id) => navigate(`/studyroom/${id}/setting`), []);

  const goToStudy = useCallback((id, token) => navigate(`/studyroom/${id}`, { state: token }), []);

  return { goToMain, goToLogin, goToSearch, goToMyPage, goToCreate, goToSetting, goToStudy };
}

export default useGoToPage;
