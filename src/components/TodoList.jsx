import React, { useState } from "react";

export const TodoList = () => {
  const initialState = [
    {
      task: "Task1",
      isCompleted: false,
    },
    {
      task: "Task2",
      isCompleted: false,
    },
  ];

  const [todos, setTodo] = useState(initialState);
  const [task, setTask] = useState("");

  const handleNewTask = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task === "") return;
    setTodo((todos) => [...todos, { task, isCompleted: false }]);
    setTask("");
  };

  const handleRemoveTask = (index) => {
    const newTodos = [...todos];
    if (window.confirm("todoを削除してもいいですか？")) {
      newTodos.splice(index, 1);
      setTodo(newTodos);
    }
  };

  return (
    <div className="wrapper">
      <h1>Todo List</h1>
      <h2>ADD TASK</h2>
      <section className="common-area">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={task}
            placeholder="New Task"
            onChange={handleNewTask}
          />
        </form>
      </section>
      <section className="common-area">
        <ul className="todolist">
          {todos.map((todo, index) => (
            <li className="todo" key={index}>
              <span className="todo-task">{todo.task}</span>
              <i
                className="far fa-trash-alt"
                onClick={() => handleRemoveTask(index)}
              ></i>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
