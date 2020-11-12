import {
  ADD_TODO,
  CHANGE_STATUS,
  EDIT_TODO,
  RESET_FORM,
  SET_EDIT,
  DELETE_TODO
} from "./../types";

export const addToDo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};

export const editToDo = (data, index) => {
  return {
    type: EDIT_TODO,
    payload: { data, index },
  };
};

export const deleteToDo = (index) => {
    return {
        type: DELETE_TODO,
        payload: index
    }
}

export const setEditToDo = (data, index) => {
  return {
    type: SET_EDIT,
    payload: { data, index },
  };
};

export const changeStatus = (payload) => {
  return {
    type: CHANGE_STATUS,
    payload,
  };
};

export const resetForm = () => {
  return {
    type: RESET_FORM,
  };
};