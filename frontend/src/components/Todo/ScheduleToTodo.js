import React, { useState } from "react";
import "./ScheduleToTodo.css";

const ScheduleToTodo = ({ scheduleItems, setScheduleItems, setTodos }) => {
  const addToTodo = (item) => {
    fetch("/api/todolist/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todoContent: item.text,
        scheduleSeq: item.id,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("추가 실패");
        return res.json();
      })
      .then((savedTodo) => {
        setTodos((prev) => [
          {
            id: savedTodo.todoSeq,
            text: savedTodo.todoContent,
            checked: savedTodo.todoEnded,
          },
          ...prev,
        ]);

        setScheduleItems((prev) => prev.filter((s) => s.id !== item.id));
      })
      .catch(console.error);
  };

  return (
    <div className="scheduleToTodo">
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

export default ScheduleToTodo;
