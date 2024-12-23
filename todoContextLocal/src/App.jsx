import { useEffect, useState } from 'react'

import './App.css'
import { TodoProvider } from './components/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
const [todos,setTodos]=useState([])

  const addTodo = (todo)=>{
    setTodos((prev) => [...prev,{id: Date.now(),...todo}])
  }

  const updateTodo = (id,todo)=>{
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))

  }
  const deleteTodo = (id)=>{
    setTodos((prev) => prev.filter((todo)=>todo.id !== id))
  }
  const toggleComplete = (id)=>{
    setTodos(prev => prev.map((prevTodo)=>prevTodo.id === id ? {...prevTodo,completed:!prevTodo.completed} : prevTodo))
  }

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length >0) {
      setTodos(todos)
    }}
  ,[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])


  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
      <h1 className='bg-pink-300 text-center text-3xl font-bold p-4 m-6 rounded-full'>Todo Task</h1>
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white  border-red-500 border-2">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-4">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo}/> 
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
