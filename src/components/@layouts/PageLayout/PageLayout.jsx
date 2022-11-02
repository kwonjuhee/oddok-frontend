import React from "react";
import { Header, Footer, MobileHeader } from "@components/@layouts";
import { useMediaQuery } from "@hooks";
import styles from "./PageLayout.module.css";

function PageLayout({ children }) {
  const { isMobile } = useMediaQuery();

  return (
    <div className={styles.container}>
      {!isMobile ? <Header /> : <MobileHeader />}
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
}

export default PageLayout;
