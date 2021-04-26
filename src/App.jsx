import React, { useState } from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idTarea, setIdTarea] = useState("");
  const [error, setError] = useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      setError("Escriba algo por favor...");
      return;
    }

    setTareas([
      ...tareas,
      {
        id: shortid.generate(),
        nombreTarea: tarea,
      },
    ]);
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  };

  const modoEdicionTarea = (item) => {
    setModoEdicion(true);
    setIdTarea(item.id);
    setTarea(item.nombreTarea);
  };

  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Escriba algo por favor...");
      return;
    }

    const arrayEditado = tareas.map((item) =>
      item.id === idTarea ? { id: idTarea, nombreTarea: tarea } : item
    );

    setTareas(arrayEditado);
    setTarea("");
    setModoEdicion(false);
    setIdTarea("");
    setError(null);
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
                <li key={item.id} className='list-group-item'>
                  <span className='lead'>{item.nombreTarea}</span>

                  <button
                    className='btn btn-danger btn-sm float-end mx-2'
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className='btn btn-warning btn-sm float-end'
                    onClick={() => modoEdicionTarea(item)}
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

          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {error ? <span className='text-danger'>{error}</span> : null}
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
