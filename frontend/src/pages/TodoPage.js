import React from "react";
import { useOutletContext } from "react-router-dom";
import TodoMain from "../components/Todo/TodoMain";

const TodoPage = () => {
  const { date, setDate } = useOutletContext();

  return <TodoMain date={date} setDate={setDate} />;
};

export default TodoPage;
