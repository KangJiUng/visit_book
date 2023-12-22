import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import List from "./components/List";
import Detail from "./components/Detail";
import Create from "./components/Create";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/list" element={<List />} /> //추가페이지로 변경
      <Route path="/post/:postId" element={<Detail />} />
      <Route path="/write" element={<Create />} />
    </Routes>
  );
}

export default App;