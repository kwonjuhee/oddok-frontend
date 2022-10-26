import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { worker } from "./mocks/browser";
import App from "./App";
import "./index.css";
import "./assets/styles";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root"),
);
