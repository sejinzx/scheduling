import React from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isSchedule = location.pathname === "/schedule";

  return (
    <div className="header">
      <div className="now_view">{isSchedule ? "캘린더" : "투두리스트"}</div>

      <Link to={isSchedule ? "/" : "/schedule"} className="menu">
        {isSchedule ? "투두리스트" : "캘린더"}
      </Link>
    </div>
  );
};

export default Header;
