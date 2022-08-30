import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { roomInfoState } from "@recoil/studyroom-state";
import { ToggleButton, Dropdown, Input, Textarea, Calendar } from "@components/commons";
import { VideoOn, VideoOff, MicOn, MicOff, Thumbnail } from "@icons";
import { TARGET_TIME_OPTIONS, USERLIMIT_OPTIONS } from "@utils/constants/options";
import { dateParsing } from "@utils";
import CloseButton from "./CloseButton/CloseButton";
import CategoryForm from "./CategoryForm/CategoryForm";
import HashtagForm from "./HashtagForm/HashtagForm";

import styles from "./SettingForm.module.css";

function SettingForm({ roomData, onClose, onUpdate }) {
  const [roomInfoAtom, setRoomInfoAtom] = useRecoilState(roomInfoState);
  const initialData = roomData || roomInfoAtom;
  const [category, setCategory] = useState(initialData.category);
  const [roomName, setRoomName] = useState(initialData.name);
  const [limitUsers, setLimitUsers] = useState(initialData.limitUsers);
  const [targetTime, setTargetTime] = useState(initialData.targetTime);
  const [hashtags, setHashtags] = useState(initialData.hashtags);
  const [endAt, setEndAt] = useState(initialData.endAt);
  const [password, setPassword] = useState(initialData.password ?? "");
  const [deviceRule, setDeviceRule] = useState({
    isCamOn: initialData.isCamOn,
    isMicOn: initialData.isMicOn,
  });
  const { isCamOn, isMicOn } = deviceRule;
  const [bgmlink, setBgmlink] = useState(initialData.bgmlink);
  const [rule, setRule] = useState(initialData.rule);

  const isInvalid = password?.length > 0 && !/^[0-9]+$/.test(password);
  const disabled = !(category && limitUsers && !isInvalid);

  const [isClickedDetail, setIsClickedDetail] = useState(false);

  const clickDetailBtn = () => {
    setIsClickedDetail((prev) => !prev);
  };

  const clickSaveBtn = () => {
    const data = {
      ...initialData,
      name: roomName.replace(/[\u{1F004}-\u{1F9E6}]|[\u{1F600}-\u{1F9D0}]/gu, ""),
      hashtags,
      isPublic: !password,
      password,
      bgmlink,
      rule: rule.replace(/[\u{1F004}-\u{1F9E6}]|[\u{1F600}-\u{1F9D0}]/gu, ""),
    };
    // 방 정보 수정
    if (onUpdate) {
      onUpdate(data);
      onClose();
      return;
    }
    // 스터디룸 생성시 입력한 방 정보 저장
    setRoomInfoAtom(data);
    onClose();
  };

  const toggleDeviceRule = (e) => {
    const { name, checked } = e.target;
    setDeviceRule((prev) => ({ ...prev, [name]: checked }));
  };

  const onChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeRule = (e) => {
    setRule(e.target.value);
  };

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.close_btn}>
          <CloseButton onClose={onClose} />
        </div>
        <div className={styles.default_box}>
          <div className={styles.roominfo_item}>
            <CategoryForm category={category} setCategory={setCategory} />
          </div>
          <div className={styles.roominfo_item}>
            <h3 className={styles.label}>스터디 명 *</h3>
            <Input
              placeholder={roomName ?? "목표를 설정하거나, 직접 입력해주세요"}
              value={roomName}
              onChange={onChangeRoomName}
            />
          </div>
          <div className={styles.roominfo_item}>
            <h3 className={styles.label}>인원 수 *</h3>
            <Dropdown options={USERLIMIT_OPTIONS} onSelect={setLimitUsers} defaultValue={`${limitUsers}명`} />
          </div>
          <div className={styles.roominfo_item}>
            <HashtagForm hashtags={hashtags} setHashtags={setHashtags} />
          </div>
        </div>
        <div className={styles.detail_button}>
          <button type="button" onClick={clickDetailBtn}>
            세부설정 ▼
          </button>
        </div>
        {isClickedDetail && (
          <>
            <div className={styles.items}>
              <div>
                <h3 className={styles.label}>스터디 이미지</h3>
                <div className={styles.image_box}>
                  <Thumbnail />
                </div>
              </div>
              <div>
                <div>
                  <h3 className={styles.label}>목표시간</h3>
                  <Dropdown options={TARGET_TIME_OPTIONS} onSelect={setTargetTime} defaultValue={`${targetTime}시간`} />
                </div>
                <div>
                  <h3 className={styles.label}> 스터디 기간</h3>
                  <Calendar onChange={setEndAt} defaultDate={dateParsing(endAt)} />
                </div>
                <div>
                  <h3 className={styles.label}>비밀번호</h3>
                  <Input
                    placeholder="숫자 4자리 비밀번호를 설정하세요"
                    maxLength="4"
                    value={password}
                    onChange={onChangePassword}
                    isInvalid={isInvalid}
                  />
                  <p className={`${styles.invalid_message} ${!isInvalid ? styles.hide : ""}`}>
                    비밀번호는 숫자 4자리 입니다.
                  </p>
                </div>
                <div>
                  <h3 className={styles.label}>장치 규칙</h3>
                  <div className={`${styles.device_item} ${isCamOn ? styles.on : ""}`}>
                    <ToggleButton
                      icon={isCamOn ? <VideoOn /> : <VideoOff />}
                      label={isCamOn ? "카메라 ON" : "카메라 OFF"}
                      onToggle={toggleDeviceRule}
                      checked={isCamOn}
                      name="isCamOn"
                    />
                    <ToggleButton
                      icon={isMicOn ? <MicOn /> : <MicOff />}
                      label={isMicOn ? "마이크 ON" : "마이크 OFF"}
                      onToggle={toggleDeviceRule}
                      checked={isMicOn}
                      name="isMicOn"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.roominfo_item}>
              <h3 className={styles.label}>노래</h3>
              <Input placeholder="유튜브 링크를 입력해주세요." />
            </div>
            <div className={styles.roominfo_item}>
              <h3 className={styles.label}>스터디 규칙</h3>
              <div className={styles.textarea}>
                <Textarea placeholder="스터디 규칙은 여기에 작성해주세요." value={rule} onChange={onChangeRule} />
              </div>
            </div>
          </>
        )}
        <div className={styles.save_button}>
          <button type="button" onClick={clickSaveBtn} disabled={disabled}>
            확인
          </button>
        </div>
      </div>
    </section>
  );
}

export default SettingForm;
