import React, { useState, useEffect } from "react";

const initialFormValues = {
  title: "",
  description: "",
};

const TodoForm = ({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) => {
  const [formValues, setsformValues] = useState(initialFormValues);
  const { title, description } = formValues;
  const [error, setError] = useState(null);
  const [successMesage, setSuccessMesage] = useState(null);

  useEffect(() => {
    if (todoEdit) {
      setsformValues(todoEdit);
    } else {
      setsformValues(initialFormValues);
    }
  }, [todoEdit]);

  const handleInputChange = (e) => {
    const changedFormValues = {
      ...formValues,
      [e.target.name]: e.target.value,
    };
    setsformValues(changedFormValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      // trim valida que no haya campos vacios
      setError("Debes indicar un titulo");
      return;
    }
    if (description.trim() === "") {
      setError("Debes indicar una descripcion");
      return;
    }

    if (todoEdit) {
      //actualizar tarea
      todoUpdate(formValues);
      setSuccessMesage("Actualizado con Exito");
    } else {
      // agregar tarea
      todoAdd(formValues);
      setSuccessMesage("Agregado con Exito");
      setsformValues(initialFormValues); //para limpiar el form y que no se produzca el doble click
    }

    setTimeout(() => {
      //para que se vaya el mensaje
      setSuccessMesage(null);
    }, 2000);
    setError(null); //para que vuelva el error a null
  };

  return (
    <div>
      <h2 className="text-center display-5">
        {" "}
        {todoEdit ? "Editar Tarea" : "Nueva Tarea"}
      </h2>

      {todoEdit && (
        <button
          className="btn btn-sm btn-warning mb-2"
          onClick={() => setTodoEdit(null)}
        >
          Cancelar Edicion
        </button>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titulo"
          className="form-control"
          value={title}
          name="title"
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Descripcion"
          className="form-control mt-2"
          value={description}
          name="description"
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block mt-2">
          {todoEdit ? "Editar " : "Agregar"}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {successMesage && (
        <div className="alert alert-success mt-2">{successMesage}</div>
      )}
    </div>
  );
};

export default TodoForm;
