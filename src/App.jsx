import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-gradient-to-br from-[#172842] via-[#1f3b63] to-[#0f1c2e] min-h-screen py-10">
  <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl px-6 py-6 text-white bg-white/10 backdrop-blur-md border border-white/20">
    
    <h1 className="text-3xl font-bold text-center mb-8 mt-2 tracking-wide">
       Your Todos
    </h1>

    <div className="mb-6 pb-4 border-b border-white/20">
      <TodoForm />
    </div>

    <div className="flex flex-wrap gap-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="w-full transition transform hover:scale-[1.01]"
        >
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>

  </div>
</div>

    </TodoProvider>
  )
}

export default App