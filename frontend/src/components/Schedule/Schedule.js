import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Schedule.css";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const { date, setDate } = useOutletContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthSchedules, setMonthSchedules] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 선택한 날짜 일정 조회
  useEffect(() => {
    fetch(`/api/schedule/date?date=${date}`)
      .then((res) => res.json())
      .then(setSchedules)
      .catch(console.error);
  }, [date]);

  // 현재 달 일정 조회
  useEffect(() => {
    fetch(
      `/api/schedule/month?year=${currentMonth.getFullYear()}&month=${
        currentMonth.getMonth() + 1
      }`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMonthSchedules(data);
      })
      .catch(console.error);
  }, [currentMonth]);

  return (
    <div className="schedule">
      <Calendar
        calendarType="gregory"
        value={new Date(date)}
        onChange={(selectedDate) => {
          const yyyy = selectedDate.getFullYear();
          const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
          const dd = String(selectedDate.getDate()).padStart(2, "0");

          setDate(`${yyyy}-${mm}-${dd}`);
          setIsOpen(true);
        }}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const day = date.getDay();

            if (day === 0) return "sunday";
            if (day === 6) return "saturday";
          }
        }}
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          const dateStr = `${date.getFullYear()}-${String(
            date.getMonth() + 1,
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

          const daySchedules = monthSchedules.filter(
            (item) =>
              item.scheduleDate === dateStr || item.scheduleEndDate === dateStr,
          );

          return (
            <>
              {daySchedules.slice(0, 3).map((schedule) => (
                <div key={schedule.scheduleSeq} className="calendar-schedule">
                  {schedule.scheduleContent}
                </div>
              ))}

              {daySchedules.length > 3 && (
                <div className="calendar-more">
                  +{daySchedules.length - 3}개
                </div>
              )}
            </>
          );
        }}
        formatMonthYear={(locale, date) => `${date.getMonth() + 1}월`}
        formatDay={(locale, date) => date.getDate()}
        activeStartDate={currentMonth}
        onActiveStartDateChange={({ activeStartDate }) =>
          setCurrentMonth(activeStartDate)
        }
        tileDisabled={({ date, view }) =>
          view === "month" && date.getMonth() !== currentMonth.getMonth()
        }
        showNeighboringMonth={false}
      />

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
            <h3>
              {new Date(date).getDate()}{" "}
              {
                ["일", "월", "화", "수", "목", "금", "토"][
                  new Date(date).getDay()
                ]
              }
              요일
            </h3>
            {schedules.length === 0 ? (
              <div className="empty-schedule">등록된 일정이 없습니다.</div>
            ) : (
              <div className="schedule-list">
                {schedules.map((schedule) => (
                  <div key={schedule.scheduleSeq} className="schedule-item">
                    <span>{schedule.scheduleContent}</span>

                    <div
                      className="schedule-edit-page"
                      onClick={() =>
                        navigate(`/schedule/edit/${schedule.scheduleSeq}`)
                      }
                    >
                      수정
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="create-btn"
              onClick={() => navigate("/schedule/create", { state: { date } })}
            >
              +
            </button>
          </div>
        </div>
      )}

      <button
        className="create-btn"
        onClick={() => navigate("/schedule/create")}
      >
        +
      </button>
    </div>
  );
};

export default Schedule;
