import { List } from "antd/lib/form/Form";
import React from "react";
import Create from "./Create";
import View from "./View";

const Todos = () => {
  return (
    <>
      <Create />
      <div className="mt-10">
        <View />
      </div>
    </>
  );
};

export default Todos;