import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons'
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [todo, setTodo] = useState()
  const [listTodo, setListToDo] = useState()
  const [edit, setEdit] = useState(false)
  const [toDoid, settoDoId] = useState()

  useEffect(() => {
    axios.get("http://localhost:4000").then((response) => {

      if (response.data.status) {
        setListToDo(response.data.todos)
      } else {

      }
    })
  }, [])

  const addTodo = (todo) => {
    axios.post("http://localhost:4000/add", { todo }).then((response) => {
      setTodo("")
      setListToDo([...listTodo, response.data.latestOne])
    })
  }


  const deletetoDo = (id) => {
    axios.delete(`http://localhost:4000/deleteTodo/${id}`).then((response) => {
      if (response.data.status) {
        const updatedTodos = listTodo.filter((todo) => todo._id !== id)
        setListToDo(updatedTodos)
      }
    })
  }

  const toEdit = (id) => {
    setEdit(true)
    settoDoId(id)
    const toedit = listTodo.filter((todo) => todo._id === id)
    setTodo(toedit[0].toDo)
  }

  const editToDo = (todo) => {
    axios.post("http://localhost:4000/edittodo", { todo, toDoid }).then((response) => {
      if (response.data.status) {
        setEdit(false)
        settoDoId(false)
        setTodo("")

        setListToDo((prevTodos) =>
          prevTodos.map((todoItem) =>
            todoItem._id === response.data.newOne._id ? response.data.newOne : todoItem
          )
        );
      }
    })
  }

  return (
    <div className="h-screen flex  justify-center mt-16 ">
      <div>
        <h1 className="font-bold text-3xl text-center">ToDo App</h1>
        <div className="flex justify-around mt-16">
          <div><input type="text" className="border-b border-b-gray-400 w-80  p-2 " placeholder="enter text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo} /></div>
          <div>{edit ? <button onClick={() => editToDo(todo)} className="bg-black px-4 py-2  mx-2 text-white hover:scale-110">Edit</button> : <button onClick={() => addTodo(todo)} className="bg-black px-4 py-2  mx-2 text-white hover:scale-110">Add</button>}</div>
        </div>

        {listTodo && <div className="mt-8 flex flex-col  space-y-4">
          {listTodo.map((todo) => (

            <div key={todo._id} className="flex justify-between">

              <div className="bg-black p-4 text-white w-96 whitespace-pre-wrap break-words">{todo.toDo}</div>
              <div className="bg-black text-white flex items-center space-x-3 p-2">
                <div onClick={() => toEdit(todo._id)} className='cursor-pointer hover:scale-125'><UilEdit size={25} /></div>
                <div onClick={() => deletetoDo(todo._id)} className='cursor-pointer hover:scale-125'><UilTrashAlt size={25} /></div>
              </div>

            </div>))}

        </div>}
      </div>

    </div>
  );
}

export default App;
