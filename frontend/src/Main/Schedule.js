import React, { useState } from "react";
import "./Schedule.css";

const Schedule = ({ scheduleItems, setScheduleItems, setTodos }) => {
  const addToTodo = (item) => {
    // 1. todo로 추가
    setTodos((prev) => [
      { id: item.id, text: item.text, checked: false, color: item.color },
      ...prev,
    ]);

    // 2. schedule에서 삭제
    setScheduleItems((prev) => prev.filter((s) => s.id !== item.id));
  };

  return (
    <div className="schedule">
      {scheduleItems.length === 0 ? (
        <div className="empty">일정이 없습니다</div>
      ) : (
        scheduleItems.map((item) => (
          <div className="item" key={item.id}>
            <div className={`dot ${item.color}`}></div>
            <div className="text">{item.text}</div>

            <div className="add" onClick={() => addToTodo(item)}>
              +
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Schedule;
