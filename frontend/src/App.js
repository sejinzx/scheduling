import React, { useEffect, useState } from "react";
import "./App.css";
import Layout from "./Layout"; // 레이아웃 컴포넌트 불러오기

function App() {
  const [date, setDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;
  });
  return (
    <div>
      <Layout date={date} setDate={setDate} /> {/* 레이아웃 적용 */}
    </div>
  );
}

export default App;
