import React from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isSchedule = location.pathname === "/schedule";
  const isCreate = location.pathname === "/schedule/create";
  const isEdit = location.pathname.startsWith("/schedule/edit");

  return (
    <div className="header">
      <div className="now_view">
        {isCreate
          ? "스케줄 생성"
          : isEdit
            ? "스케줄 수정"
            : isSchedule
              ? "캘린더"
              : "투두리스트"}
      </div>

      {!isCreate && !isEdit && (
        <Link to={isSchedule ? "/" : "/schedule"} className="menu">
          {isSchedule ? "투두리스트" : "캘린더"}
        </Link>
      )}
    </div>
  );
};

export default Header;
