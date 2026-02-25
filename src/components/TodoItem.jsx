import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const {updateTodo, deleteTodo, toggleComplete} = useTodo()

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

  return (
        <div
    className={`flex items-center border border-gray-300 rounded-xl px-4 py-2 gap-x-3 shadow-md transition-all duration-300 text-gray-800 
        ${todo.completed ? "bg-green-200" : "bg-purple-200"}`}
    >
    <input
        type="checkbox"
        className="cursor-pointer w-5 h-5 accent-green-600"
        checked={todo.completed}
        onChange={toggleCompleted}
    />

    <input
        type="text"
        className={`w-full bg-transparent rounded-lg outline-none text-base font-medium
        ${isTodoEditable ? "border border-gray-300 px-2 py-1 focus:ring-2 focus:ring-green-500" : "border-transparent"}
        ${todo.completed ? "line-through text-gray-500" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
    />

    <button
        className="inline-flex w-9 h-9 rounded-lg text-sm border border-gray-300 justify-center items-center bg-white hover:bg-gray-100 active:scale-95 transition disabled:opacity-50"
        onClick={() => {
        if (todo.completed) return;

        if (isTodoEditable) {
            editTodo();
        } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
    >
        {isTodoEditable ? "📁" : "✏️"}
    </button>

    <button
        className="inline-flex w-9 h-9 rounded-lg text-sm border border-gray-300 justify-center items-center bg-white hover:bg-red-100 active:scale-95 transition"
        onClick={() => deleteTodo(todo.id)}
    >
        ❌
    </button>
    </div>

  );
}

export default TodoItem;