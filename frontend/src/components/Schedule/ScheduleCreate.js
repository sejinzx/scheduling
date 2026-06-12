import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ScheduleCreate.css";

const ScheduleCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [type, setType] = useState("schedule");
  const [scheduleContent, setScheduleContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleEndDate, setScheduleEndDate] = useState("");

  useEffect(() => {
    if (location.state?.date) {
      setScheduleDate(location.state.date);
      setScheduleEndDate(location.state.date);
    }
  }, [location.state]);

  const createSchedule = () => {
    fetch("/api/schedule/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scheduleContent,
        scheduleDate,
        scheduleEndDate,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("생성 실패");
        return res.json();
      })
      .then(() => {
        navigate("/schedule");
      })
      .catch(console.error);
  };

  return (
    <div className="schedule-create">
      <input
        type="text"
        placeholder="일정 내용"
        value={scheduleContent}
        onChange={(e) => setScheduleContent(e.target.value)}
      />

      <div>
        <label>
          <input
            type="radio"
            value="schedule"
            checked={type === "schedule"}
            onChange={(e) => setType(e.target.value)}
          />
          일정
        </label>

        <label>
          <input
            type="radio"
            value="period"
            checked={type === "period"}
            onChange={(e) => setType(e.target.value)}
          />
          기간
        </label>
      </div>

      {type === "schedule" ? (
        <input
          type="date"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
        />
      ) : (
        <input
          type="date"
          value={scheduleEndDate}
          onChange={(e) => setScheduleEndDate(e.target.value)}
        />
      )}

      <div className="button-group">
        <button onClick={() => navigate("/schedule")}>취소</button>
        <button onClick={createSchedule}>생성</button>
      </div>
    </div>
  );
};

export default ScheduleCreate;
