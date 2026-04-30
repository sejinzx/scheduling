import React, { useState } from "react";
import "./TodoList.css";

const TodoList = ({ todos, setTodos, setScheduleItems }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleCheck = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  };

  const addTodo = () => {
    const newId = Date.now();

    const newTodo = {
      id: newId,
      text: "",
      checked: false,
    };

    // 🔥 맨 아래 추가
    setTodos((prev) => [...prev, newTodo]);

    setEditingId(newId);
    setEditText("");
  };

  const removeTodo = (todo) => {
    // 1. todo 삭제
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));

    // 2. schedule로 복구
    setScheduleItems((prev) => [
      ...prev,
      {
        id: todo.id,
        text: todo.text,
        color: todo.color || "green",
      },
    ]);
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const finishEdit = (id) => {
    if (editText.trim() === "") {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editText } : todo,
        ),
      );
    }

    setEditingId(null);
  };

  return (
    <div className="todo">
      {todos.map((todo) => (
        <div className="todo-item" key={todo.id}>
          {/* 체크박스 */}
          <div
            className={`todo-box ${todo.checked ? "checked" : ""}`}
            onClick={() => toggleCheck(todo.id)}
          >
            {todo.checked && "✓"}
          </div>

          {/* 텍스트 / 입력 */}
          {editingId === todo.id ? (
            <input
              className="todo-input"
              value={editText}
              placeholder="입력하세요"
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => finishEdit(todo.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") finishEdit(todo.id);
              }}
              autoFocus
            />
          ) : (
            <div
              className={`todo-text ${todo.checked ? "done" : ""}`}
              onClick={() => startEdit(todo)}
            >
              {todo.text || "입력하세요"}
            </div>
          )}

          {/* 삭제 */}
          <div className="todo-delete" onClick={() => removeTodo(todo)}>
            x
          </div>
        </div>
      ))}

      <div className="todo-add" onClick={addTodo}>
        +
      </div>
    </div>
  );
};

export default TodoList;
