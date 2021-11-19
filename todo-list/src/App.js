import React, { useEffect, useState } from "react";
import TodoForm from "./componentes/TodoForm";
import TodoList from "./componentes/TodoList";

const initialTodos = [
  {
    id: 1,
    title: "Todo #1",
    description: "Desc del Todo #1",
    complete: false,
  },
  {
    id: 2,
    title: "Todo #2",
    description: "Desc del Todo #2",
    complete: false,
  },
];

const localTodos = JSON.parse(localStorage.getItem("todos"));

const App = () => {
  const [todos, setTodos] = useState(localTodos || initialTodos);
  const [todoEdit, setTodoEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const todoDelete = (todoId) => {
    if (todoEdit && todoId === todoEdit.id) {
      setTodoEdit(null);
    }
    const changedTodos = todos.filter((todo) => todoId !== todo.id);

    setTodos(changedTodos);
  };

  const todoToogleCompleted = (todoId) => {
    //-------- solucion 1
    // const changedTodos = todos.map((todo) => {
    //   const todoEdit = {
    //     ...todo,
    //     complete: !todo.complete,
    //   };

    //   if (todo.id === todoId) {
    //     return todoEdit;
    //   } else {
    //     return todo;
    //   }
    // });

    //--------solucion 2

    const changedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, complete: !todo.complete } : todo
    );

    setTodos(changedTodos);
  };

  const todoAdd = (todo) => {
    const newTodo = {
      id: Date.now(),
      ...todo,
      complete: false,
    };

    const changedTodos = [...todos, newTodo];

    setTodos(changedTodos);
  };

  const todoUpdate = (todoEdit) => {
    const changedTodos = todos.map((todo) =>
      todo.id === todoEdit.id ? todoEdit : todo
    );

    setTodos(changedTodos);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-8">
          <TodoList
            todos={todos}
            todoDelete={todoDelete}
            todoToogleCompleted={todoToogleCompleted}
            setTodoEdit={setTodoEdit}
          />
        </div>
        <div className="col-4">
          <TodoForm
            todoAdd={todoAdd}
            todoEdit={todoEdit}
            todoUpdate={todoUpdate}
            setTodoEdit={setTodoEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
