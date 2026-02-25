import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
      e.preventDefault()

      if (!todo) return

      addTodo({ todo, completed: false})
      setTodo("")
    }

  return (
        <form
    onSubmit={add}
    className="flex max-w-lg mx-auto mt-10 shadow-lg rounded-xl overflow-hidden bg-white/10 backdrop-blur-md"
    >
    <input
        type="text"
        placeholder="Write Todo..."
        className="w-full px-4 py-2 text-gray-800 bg-white rounded-l-xl outline-none border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
    />
    <button
        type="submit"
        className="px-5 py-2 bg-green-600 text-white font-semibold rounded-r-xl hover:bg-green-700 active:scale-95 transition"
    >
        Add
    </button>
    </form>

  );
}

export default TodoForm;