import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { agregarTarea, elimiarTarea, editarTarea } from "./redux/tareasDucks";

function App() {
  const [tarea, setTarea] = useState("");
  const [id, setId] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const tareas = useSelector((store) => store.tareas.tareas);

  const add = (e) => {
    e.preventDefault();
    if (tarea.trim() === "") {
      setError("Debe ingresar una tarea");
    } else {
      dispatch(agregarTarea(tarea));
      setTarea("");
      setError("");
    }
  };

  const eliminarTarea = (id) => {
    dispatch(elimiarTarea(id));
  };

  const activeEditMode = (item) => {
    setModoEdicion(true);
    setId(item[1]);
    setTarea(item[0]);
  };

  const edit = (e) => {
    e.preventDefault();
    if (tarea.trim() === "") {
      setError("Debe ingresar una tarea");
    } else {
      dispatch(editarTarea(id, tarea));
      setTarea("");
      setModoEdicion(false);
      setError("");
    }
  };

  return (
    <div className='container '>
      <h1 className='text-center mt-5'>CRUD SIMPLE</h1>
      <hr />

      <div className='row'>
        <div className='col-8'>
          <h4 className='text-center'>Lista de Tareas</h4>

          <ul className='list-group'>
            {tareas.length === 0 ? (
              <li className='list-group-item text-center text-uppercase mt-4'>
                No hay tareas
              </li>
            ) : (
              tareas.map((item) => (
                <li key={item[1]} className='list-group-item'>
                  <span className='lead'>{item[0]}</span>

                  <button
                    className='btn btn-danger btn-sm float-end mx-2'
                    onClick={() => eliminarTarea(item[1])}
                  >
                    Eliminar
                  </button>
                  <button
                    className='btn btn-warning btn-sm float-end'
                    onClick={() => activeEditMode(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className='col-4'>
          <h4 className='text-center'>
            {modoEdicion ? "Editar Tarea" : "Agregar Tarea"}
          </h4>

          {error ? <p>{error}</p> : null}

          <form onSubmit={modoEdicion ? edit : add}>
            <input
              type='text'
              className='form-control mb-2'
              placeholder='Ingrese tarea.'
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
            />

            <div className='d-grid'>
              {modoEdicion ? (
                <button className='btn btn-warning' type='submit'>
                  Editar
                </button>
              ) : (
                <button className='btn btn-dark' type='submit'>
                  Agregar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
