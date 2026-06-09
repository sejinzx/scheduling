import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Schedule.css";

const Schedule = () => {
  const { date, setDate } = useOutletContext();

  // 현재 보고 있는 달 상태
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className="schedule">
      <Calendar
        calendarType="gregory"
        // 선택된 날짜
        value={date}
        // 날짜 클릭
        onChange={setDate}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const day = date.getDay();

            if (day === 0) return "sunday";
            if (day === 6) return "saturday";
          }
        }}
        // 일 숫자만 표시
        formatDay={(locale, date) => date.getDate()}
        // 현재 보고 있는 달
        activeStartDate={currentMonth}
        // 달 이동 시 상태 변경
        onActiveStartDateChange={({ activeStartDate }) =>
          setCurrentMonth(activeStartDate)
        }
        // 현재 달이 아닌 날짜 비활성화
        tileDisabled={({ date, view }) =>
          view === "month" && date.getMonth() !== currentMonth.getMonth()
        }
        showNeighboringMonth={false}
      />
    </div>
  );
};

export default Schedule;
