import React, { useState } from "react";
import Schedule from "./Schedule";
import TodoList from "./TodoList";

const Main = () => {
  const [scheduleItems, setScheduleItems] = useState([
    { id: 1, text: "급함", color: "red" },
    { id: 2, text: "아직 여유", color: "orange" },
    { id: 3, text: "여유여유", color: "green" },
  ]);

  const [todos, setTodos] = useState([]);

  return (
    <div className="main">
      <Schedule
        scheduleItems={scheduleItems}
        setScheduleItems={setScheduleItems}
        setTodos={setTodos}
      />

      <TodoList
        todos={todos}
        setTodos={setTodos}
        setScheduleItems={setScheduleItems}
      />
    </div>
  );
};

export default Main;
