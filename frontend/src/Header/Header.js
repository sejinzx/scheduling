import React from "react";
import "./Header.css";
import calendarIcon from "./image/calendar.png";

const Header = () => {
  return (
    <div className="header">
      <div className="date">04/29</div>
      <div className="prev">&lt;</div>
      <div className="next">&gt;</div>
      <div className="calendar">
        <img src={calendarIcon} alt="캘린더" />
      </div>
    </div>
  );
};

export default Header;
