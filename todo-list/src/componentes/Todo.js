import React from "react";

const Todo = ({ todo, todoDelete, todoToogleCompleted, setTodoEdit }) => {
  return (
    <div className="card mt-2">
      <div className="card-body">
        <h3 className="card-title text-right">
          {todo.title}
          <button
            className={`btn btn-sm ${
              todo.complete ? `btn-outline-success` : `btn-success`
            } m-2`}
            onClick={() => todoToogleCompleted(todo.id)}
          >
            {todo.complete ? "Terminado" : "Terminar"}
          </button>
        </h3>
        <p className="card-text text-right"> {todo.description}</p>
        <hr />

        <div className="d-flex  justify-content-end">
          <button
            onClick={() => setTodoEdit(todo)}
            className="btn btn-sn btn-outline-primary m-2"
          >
            Editar
          </button>
          <button
            className="btn btn-sn btn-outline-danger m-2"
            onClick={() => todoDelete(todo.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
