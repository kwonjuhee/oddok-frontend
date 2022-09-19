import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorModal } from "@components/@commons";
import Router from "./routes/Router";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <ErrorModal />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
