import React, { useState } from "react";
import "./Header.css";
import calendarIcon from "./image/calendar.png";

const Header = ({ date, setDate }) => {
  const changeDate = (diff) => {
    const current = new Date(date);
    const next = new Date(current);
    next.setDate(current.getDate() + diff);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    next.setHours(0, 0, 0, 0);

    if (next > today) return;

    const formatted = `${next.getFullYear()}-${String(
      next.getMonth() + 1,
    ).padStart(2, "0")}-${String(next.getDate()).padStart(2, "0")}`;

    setDate(formatted);
  };

  const displayDate = () => {
    const d = new Date(date);
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
      d.getDate(),
    ).padStart(2, "0")}`;
  };

  const isToday = () => {
    const today = new Date();
    const d = new Date(date);

    return (
      today.getFullYear() === d.getFullYear() &&
      today.getMonth() === d.getMonth() &&
      today.getDate() === d.getDate()
    );
  };

  return (
    <div className="header">
      <div className="prev" onClick={() => changeDate(-1)}>
        &lt;
      </div>

      <div className="date">{displayDate()}</div>

      <div
        className={`next ${isToday() ? "disabled" : ""}`}
        onClick={() => changeDate(1)}
      >
        &gt;
      </div>
      <div className="calendar">캘린더</div>
    </div>
  );
};

export default Header;
