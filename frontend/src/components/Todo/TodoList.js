import React, { useEffect, useState } from "react";
import "./TodoList.css";

const TodoList = ({ todos, setTodos, date }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!date) return;

    fetch(`/api/todolist?date=${date}`)
      .then((res) => {
        if (!res.ok) throw new Error("조회 실패");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((item) => ({
          id: item.todoSeq,
          text: item.todoContent,
          checked: item.todoEnded,
        }));

        setTodos(mapped);
      })
      .catch(console.error);
  }, [date]);

  const toggleCheck = (id) => {
    const target = todos.find((t) => t.id === id);
    const updatedChecked = !target.checked;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: updatedChecked } : todo,
      ),
    );

    fetch(`/api/todolist/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todoEnded: updatedChecked,
      }),
    }).catch((err) => {
      console.error(err);

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, checked: !updatedChecked } : todo,
        ),
      );
    });
  };

  const addTodo = () => {
    const newId = Date.now();

    setTodos((prev) => [
      ...prev,
      {
        id: newId,
        text: "",
        checked: false,
        isNew: true,
      },
    ]);

    setEditingId(newId);
    setEditText("");
  };

  const finishEdit = (id) => {
    if (isSaving) return;

    setIsSaving(true);

    const trimmed = editText.trim();

    if (!trimmed) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setEditingId(null);
      setIsSaving(false);
      return;
    }

    const target = todos.find((t) => t.id === id);
    const isNew = target?.isNew;

    const url = isNew ? "/api/todolist/new" : `/api/todolist/update/${id}`;

    const method = isNew ? "POST" : "PUT";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todoContent: trimmed,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("저장 실패");
        return res.json();
      })
      .then((savedTodo) => {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id
              ? {
                  id: savedTodo.todoSeq ?? savedTodo.id,
                  text: savedTodo.todoContent,
                  checked: false,
                }
              : todo,
          ),
        );

        setEditingId(null);
      })
      .catch(console.error)
      .finally(() => setIsSaving(false));
  };

  const editTodo = (id) => {
    const target = todos.find((t) => t.id === id);
    setEditingId(id);
    setEditText(target?.text || "");
  };

  const saveTodo = (id) => {
    const trimmed = editText.trim();

    if (!trimmed) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setEditingId(null);
      return;
    }

    fetch(`/api/todolist/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todoContent: trimmed,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("저장 실패");
        return res.json();
      })
      .then((updatedTodo) => {
        setTodos((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  text: updatedTodo.todoContent,
                }
              : t,
          ),
        );

        setEditingId(null);
      })
      .catch(console.error);
  };

  const removeTodo = (id) => {
    fetch(`/api/todolist/delete/${id}`, {
      method: "PUT",
    })
      .then((res) => {
        if (!res.ok) throw new Error("삭제 실패");
      })
      .then(() => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      })
      .catch(console.error);
  };

  const cancelTodo = () => {
    setEditingId(null);
  };

  return (
    <div className="todo">
      {todos.length === 0 ? (
        <div className="empty-todo">투루리스트가 없습니다</div>
      ) : (
        todos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            <div
              className={`todo-box ${todo.checked ? "checked" : ""}`}
              onClick={() => toggleCheck(todo.id)}
            >
              {todo.checked && "✓"}
            </div>
            {editingId === todo.id ? (
              <input
                className="todo-input"
                value={editText}
                placeholder={!editText ? "입력하세요" : ""}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => finishEdit(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    finishEdit(todo.id);
                  }
                }}
                autoFocus
              />
            ) : (
              <div className={`todo-text ${todo.checked ? "done" : ""}`}>
                {todo.text || "입력하세요"}
              </div>
            )}
            {editingId === todo.id ? (
              <>
                <div className="todo-save" onClick={() => saveTodo(todo.id)}>
                  저장
                </div>
                <div className="separation">|</div>
                <div className="todo-cancel" onClick={cancelTodo}>
                  취소
                </div>
              </>
            ) : (
              <>
                <div className="todo-edit" onClick={() => editTodo(todo.id)}>
                  수정
                </div>
                <div className="separation">|</div>
                <div
                  className="todo-delete"
                  onClick={() => removeTodo(todo.id)}
                >
                  삭제
                </div>
              </>
            )}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        ))
      )}

      <div className="todo-add" onClick={addTodo}>
        +
      </div>
    </div>
  );
};

export default TodoList;
