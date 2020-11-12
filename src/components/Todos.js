import React from "react";
import TodoCreate from "./TodoCreate";
import TodosList from "./TodosList";

const Todos = () => {
  return (
    <>
      <TodoCreate />
      <div className="mt-10">
        <TodosList />
      </div>
    </>
  );
};

export default Todos;
