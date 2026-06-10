import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import TodoPage from "./pages/TodoPage";
import SchedulePage from "./pages/SchedulePage";
import "./App.css";

function App() {
  const [date, setDate] = useState(() => {
    const d = new Date();

    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(d.getDate()).padStart(2, "0")}`;
  });

  return (
    <Routes>
      <Route element={<Layout date={date} setDate={setDate} />}>
        <Route path="/" element={<TodoPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Route>
    </Routes>
  );
}

export default App;
