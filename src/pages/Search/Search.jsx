import React from "react";
import { Routes, Route } from "react-router-dom";
import { PageLayout } from "@components/@layouts";
import { InputForm, SearchBrowse, SearchResult } from "@components/search";

function Search() {
  return (
    <PageLayout>
      <InputForm />
      <Routes>
        <Route path="/" element={<SearchBrowse />} />
        <Route path="/studyroom" element={<SearchResult />} />
      </Routes>
    </PageLayout>
  );
}

export default Search;
