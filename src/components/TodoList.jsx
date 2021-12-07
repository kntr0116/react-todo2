/**
 * TodoList
 * @package components
 */
import React, { useState } from "react";
/* constants */
import { INITIAL_TODO_LIST, INITIAL_TODO_LIST_COUNT } from "../constants/data";

/**
 * TodoList
 * @returns
 */
export const TodoList = () => {
  /* state */
  /* todo list */
  const [todos, setTodos] = useState(INITIAL_TODO_LIST);
  /* add input title */
  const [addInputValue, setAddInputValue] = useState("");
  /* todo 採番ID */
  const [uniqueId, setUniqueId] = React.useState(INITIAL_TODO_LIST_COUNT);

  /* actions */
  /**
   * addInputValueの変更処理
   * @param {*} event
   */
  const handleChangeAddInputValue = (event) => {
    setAddInputValue(event.target.value);
  };

  /**
   * タスク追加処理
   * @param {*} event
   */
  const handleAddTodo = (event) => {
    //  エンターキーが押された時にTodoを追加する
    if (event.key === "Enter" && addInputValue !== "") {
      const nextUniqueId = uniqueId + 1;
      // Todo追加処理
      // 元の配列を破壊しないように配列のコピーを作成して、その値でstateを更新する
      // pushでの配列追加は元の配列の値を変更するのでエラーになる

      // concatの処理
      // setTodos(
      //   // concatとpushの違い
      //   // https://kskpblog.com/javascript-array-add/
      //   todos.concat({
      //     id: nextUniqueId,
      //     title: addInputValue,
      //   })
      // );

      // スプレッド構文の処理
      setTodos([
        ...todos,
        {
          id: nextUniqueId,
          title: addInputValue,
        },
      ]);
      // 採番IDを更新
      setUniqueId(nextUniqueId);
      // todo追加後、入力値をリセット
      setAddInputValue("");
    }
  };

  /**
   * タスク削除処理
   * @param {*} targetId
   * @param {*} targetTitle
   */
  const handleRemoveTask = (targetId, targetTitle) => {
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {
      // 削除するid以外のtodoリストを再編集
      // filterを用いた方法
      const newTodos = todos.filter((todo) => todo.id !== targetId);
      // 削除するTodoの配列番号を取り出してspliceで削除する方法もある
      // const newTodos = [...todoList];
      // const deleteIndex = newTodos.findIndex((todo) => todo.id === targetId);
      // newTodos.splice(deleteIndex, 1);
      setTodos(newTodos);
    }
  };

  return (
    <div className="wrapper">
      <h1>Todo List</h1>

      <section className="common-area">
        <h2>ADD TASK</h2>
        {/* formタグでsubmitはおすすめされない */}
        {/* https://document.intra-mart.jp/library/iap/public/im_ui/im_design_guideline_pc/texts/contents_area/submit.html */}
        <div>
          <input
            type="text"
            value={addInputValue}
            placeholder="New Task"
            onChange={handleChangeAddInputValue}
            onKeyDown={handleAddTodo}
          />
        </div>
      </section>
      <section className="common-area">
        <ul className="todolist">
          {todos.map((todo) => (
            <li className="todo" key={todo.id}>
              <span className="todo-task">{todo.title}</span>
              <i
                className="far fa-trash-alt"
                onClick={() => handleRemoveTask(todo.id, todo.title)}
              ></i>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
