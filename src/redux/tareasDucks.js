//  constantes
import shortid from "shortid";

const dataInicial = {
  tareas: [],
};
// types
const ADD_TAREAS_EXITO = "ADD_TAREAS_EXITO";
const DELETE_TAREAS_EXITO = "DELETE_TAREAS_EXITO";
const EDIT_TAREA = "EDIT_TAREA";

// reducer
export default function tareasReducer(state = dataInicial, action) {
  switch (action.type) {
    case ADD_TAREAS_EXITO: {
      const tareas = [...state.tareas];
      tareas.push(action.payload);

      return { ...state, tareas: tareas };
    }
    case DELETE_TAREAS_EXITO: {
      const tareas = [...state.tareas];
      const arrayFiltrado = tareas.filter((item) => item[1] !== action.payload);

      return { ...state, tareas: arrayFiltrado };
    }
    case EDIT_TAREA: {
      const id = action.payload[1];
      const tarea = action.payload[0];

      const tareas = [...state.tareas];

      tareas.map((item) => {
        if (item[1] === id) {
          item[0] = tarea;
        }
        return { ...state, item };
      });
    }
    default:
      return state;
  }
}

// acciones
export const agregarTarea = (tarea) => (dispatch) => {
  const id = shortid.generate();
  dispatch({
    type: ADD_TAREAS_EXITO,
    payload: [tarea, id],
  });
};

export const elimiarTarea = (id) => (dispatch) => {
  dispatch({
    type: DELETE_TAREAS_EXITO,
    payload: id,
  });
};

export const editarTarea = (id, tarea) => (dispatch) => {
  dispatch({
    type: EDIT_TAREA,
    payload: [tarea, id],
  });
};
