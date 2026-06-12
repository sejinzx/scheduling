import React, { useState, useEffect } from "react";
import ScheduleToTodo from "./ScheduleToTodo";
import TodoList from "./TodoList";
import "./TodoMain.css";

const TodoMain = ({ date, setDate }) => {
  const [scheduleItems, setScheduleItems] = useState([]);
  const [todos, setTodos] = useState([]);

  const getColorByPriority = (priority) => {
    switch (priority) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "green";
      default:
        return "gray";
    }
  };

  useEffect(() => {
    if (!date) return;

    fetch(`/api/schedule/priority?date=${encodeURIComponent(date)}`)
      .then((res) => {
        if (!res.ok) throw new Error("API 실패");
        return res.json();
      })
      .then((data) => {
        console.log("response =", data);

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
            ? data.data
            : [];

        const mapped = list.map((item) => ({
          id: item.scheduleSeq,
          text: item.scheduleContent,
          color: getColorByPriority(item.schedulePriority),
        }));

        setScheduleItems(mapped);
      })
      .catch(console.error);
  }, [date]);

  const changeDate = (diff) => {
    const current = new Date(date);
    const next = new Date(current);

    next.setDate(current.getDate() + diff);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    next.setHours(0, 0, 0, 0);

    if (next > today) return;

    const formatted = `${next.getFullYear()}-${String(
      next.getMonth() + 1,
    ).padStart(2, "0")}-${String(next.getDate()).padStart(2, "0")}`;

    setDate(formatted);
  };

  const displayDate = () => {
    const d = new Date(date);

    return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
      d.getDate(),
    ).padStart(2, "0")}`;
  };

  const isToday = () => {
    const today = new Date();
    const d = new Date(date);

    return (
      today.getFullYear() === d.getFullYear() &&
      today.getMonth() === d.getMonth() &&
      today.getDate() === d.getDate()
    );
  };

  return (
    <div className="todo_main">
      <div className="view_date">
        <div className="prev" onClick={() => changeDate(-1)}>
          &lt;
        </div>

        <div className="date">{displayDate()}</div>

        <div
          className={`next ${isToday() ? "disabled" : ""}`}
          onClick={() => changeDate(1)}
        >
          &gt;
        </div>
      </div>

      <ScheduleToTodo
        scheduleItems={scheduleItems}
        setScheduleItems={setScheduleItems}
        setTodos={setTodos}
      />

      <TodoList
        todos={todos}
        setTodos={setTodos}
        date={date}
        setDate={setDate}
      />
    </div>
  );
};

export default TodoMain;
