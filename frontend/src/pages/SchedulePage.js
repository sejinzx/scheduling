import React from "react";
import { useOutletContext } from "react-router-dom";
import Schedule from "../components/Schedule/Schedule";

const SchedulePage = () => {
  const { date, setDate } = useOutletContext();

  return <Schedule date={date} setDate={setDate} />;
};

export default SchedulePage;
