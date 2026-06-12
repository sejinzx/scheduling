import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./ScheduleEdit.css";

const ScheduleEdit = () => {
  const navigate = useNavigate();

  const [scheduleContent, setScheduleContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleEndDate, setScheduleEndDate] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/schedule/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setScheduleContent(data.scheduleContent || "");
        setScheduleDate(data.scheduleDate || "");
        setScheduleEndDate(data.scheduleEndDate || "");
      })
      .catch(console.error);
  }, [id]);

  const editSchedule = (id) => {
    fetch(`/api/schedule/update/${id}`, {
      method: "PUT",
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
        if (!res.ok) throw new Error("수정 실패");
        return res.json();
      })
      .then(() => {
        navigate("/schedule");
      })
      .catch(console.error);
  };

  return (
    <div className="schedule-edit">
      <input
        type="text"
        placeholder="일정 내용"
        value={scheduleContent}
        onChange={(e) => setScheduleContent(e.target.value)}
      />

      <input
        type="date"
        value={scheduleDate}
        onChange={(e) => setScheduleDate(e.target.value)}
      />

      <input
        type="date"
        value={scheduleEndDate}
        onChange={(e) => setScheduleEndDate(e.target.value)}
      />

      <div className="button-group">
        <button onClick={() => navigate("/schedule")}>취소</button>
        <button onClick={() => editSchedule(id)}>수정</button>
      </div>
    </div>
  );
};

export default ScheduleEdit;
