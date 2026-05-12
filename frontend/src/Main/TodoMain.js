import React, { useState } from "react";
import ScheduleToTodo from "./ScheduleToTodo";
import TodoList from "./TodoList";

const Main = ({ date }) => {
  const [scheduleItems, setScheduleItems] = useState([
    { id: 1, text: "급함", color: "red" },
    { id: 2, text: "아직 여유", color: "orange" },
    { id: 3, text: "여유여유", color: "green" },
  ]);

  const [todos, setTodos] = useState([]);

  return (
    <div className="main">
      <ScheduleToTodo
        scheduleItems={scheduleItems}
        setScheduleItems={setScheduleItems}
        setTodos={setTodos}
      />

      <TodoList todos={todos} setTodos={setTodos} date={date} />
    </div>
  );
};

export default Main;
