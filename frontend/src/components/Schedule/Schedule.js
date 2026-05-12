import React from "react";
import { useOutletContext } from "react-router-dom";
import Calendar from "react-calendar";
import "./Schedule.css";

const Schedule = () => {
  const { date, setDate } = useOutletContext();

  return (
    <div className="schedule_main">
      <Calendar />
    </div>
  );
};

export default Schedule;
