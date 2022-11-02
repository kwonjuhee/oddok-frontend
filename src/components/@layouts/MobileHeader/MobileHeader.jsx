import React, { useState } from "react";
import { Search, Profile } from "@icons";
import { useGoToPage } from "@hooks";
import ProfileSideBar from "./ProfileSideBar";
import styles from "./MobileHeader.module.css";

function MobileHeader() {
  const { goToSearch } = useGoToPage();
  const [isOpenProfileSideBar, setIsOpenProfileSideBar] = useState(false);

  const toggleProfileSideBar = () => setIsOpenProfileSideBar((prev) => !prev);

  return (
    <>
      <header className={styles.header}>
        <a href="/">ODDOK</a>
        <div className={styles.menu}>
          <button type="button" onClick={goToSearch}>
            <Search />
          </button>
          <button type="button" onClick={toggleProfileSideBar}>
            <Profile />
          </button>
        </div>
      </header>
      {isOpenProfileSideBar && <ProfileSideBar toggleProfileSideBar={toggleProfileSideBar} />}
    </>
  );
}

export default MobileHeader;
