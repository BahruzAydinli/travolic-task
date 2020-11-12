import { createStore, combineReducers } from "redux";
import { todosReducer, optionsReducer, todoFormReducer } from "./reducers";

const rootReducer = combineReducers({
  todos: todosReducer,
  todoForm: todoFormReducer,
  options: optionsReducer,
});

const store = createStore(rootReducer);

export default store;
