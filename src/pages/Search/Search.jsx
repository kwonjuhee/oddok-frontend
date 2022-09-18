import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@components/layout";
import { InputForm, SearchBrowse, SearchResult } from "@components/search";

function Search() {
  return (
    <Layout>
      <InputForm />
      <Routes>
        <Route path="/" element={<SearchBrowse />} />
        <Route path="/studyroom" element={<SearchResult />} />
      </Routes>
    </Layout>
  );
}

export default Search;
