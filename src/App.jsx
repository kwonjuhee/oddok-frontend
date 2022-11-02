import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorModal } from "@components/@commons";
import Router from "./routes/Router";

function App() {
  return (
    <BrowserRouter>
      <ErrorModal />
      <Router />
    </BrowserRouter>
  );
}

export default App;
