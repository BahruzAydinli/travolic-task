import {
  ADD_TODO,
  CHANGE_STATUS,
  DELETE_TODO,
  EDIT_TODO,
  RESET_FORM,
  SET_EDIT,
} from "./../types";

export const todosReducer = (
  data = JSON.parse(localStorage.getItem("todo-list")) || [],
  action
) => {
  let newData = [...data];
  switch (action.type) {
    case ADD_TODO:
      newData.push({
        ...action.payload,
        id: data.length ? data[data.length - 1].id + 1 : 1,
      });
      localStorage.setItem("todo-list", JSON.stringify(newData));
      return newData;
    case CHANGE_STATUS:
      newData.find((d) => d.id === action.payload.row).status =
        action.payload.status;
      localStorage.setItem("todo-list", JSON.stringify(newData));
      return newData;
    case EDIT_TODO:
      newData[action.payload.index] = action.payload.data;
      localStorage.setItem("todo-list", JSON.stringify(newData));
      return newData;
    case DELETE_TODO:
      newData.splice(action.payload, 1);
      localStorage.setItem("todo-list", JSON.stringify(newData));
      return newData;
    default:
      return data;
  }
};

export const todoFormReducer = (data = null, action) => {
  switch (action.type) {
    case SET_EDIT:
      return action.payload;
    case RESET_FORM:
      return null;
    default:
      return data;
  }
};

const initialOptions = {
  priorities: [
    { id: 1, name: "High" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Low" },
  ],
  statuses: [
    { id: 1, name: "To do" },
    { id: 2, name: "In progress" },
    { id: 3, name: "Done" },
  ],
  users: [
    { id: 1, fullname: "Bəhruz Aydınlı" },
    { id: 2, fullname: "İlkin Quluzadə" },
    { id: 3, fullname: "Qaçaq Nəbi" },
    { id: 4, fullname: "LeBron James" },
  ],
};

export const optionsReducer = (data = initialOptions, action) => {
  switch (action.type) {
    default:
      return data;
  }
};
