import React, { useState } from "react";
import { notification, Popconfirm, Table, Tooltip, Modal } from "antd";
import { connect } from "react-redux";
import {
  AimOutlined,
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationOutlined,
  EyeOutlined,
  SmileOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { changeStatus, setEditToDo, deleteToDo } from "../redux/actions";
import moment from "moment";

const colors = {
  High: "#ff0022",
  Medium: "#00a2ff",
  Low: "#00ff59",
};

const View = (props) => {
  const [sortKey, setSortKey] = useState("no");
  const [order, setOrder] = useState("asc");

  const handleSortObjectChange = (key, order) => {
    setSortKey(key);
    setOrder(order);
  };

  const handleStatusChange = (e, row) => {
    const status = props.options.statuses.find((s) => s.id === e);
    props.changeStatus({ row, status });
    notification.info({
      message: `Status changed to "${status.name}"`,
      icon: <SmileOutlined />,
    });
  };

  const getColumnTitle = (key, word) => {
    return (
      <span>
        {word}{" "}
        {sortKey !== key || order === "desc" ? (
          <SortDescendingOutlined
            onClick={() => handleSortObjectChange(key, "asc")}
          />
        ) : (
          <SortAscendingOutlined
            onClick={() => handleSortObjectChange(key, "desc")}
          />
        )}
      </span>
    );
  };

  const columns = [
    {
      title: "#",
      key: 1,
      dataIndex: "no",
    },
    {
      title: getColumnTitle("title", "Title"),
      key: 2,
      dataIndex: "title",
    },
    {
      title: getColumnTitle("priority", "Priority"),
      key: 3,
      dataIndex: "priority",
      render: (a) => (
        <span style={{ fontWeight: "bold", color: colors[a] }}>{a}</span>
      ),
    },
    {
      title: getColumnTitle("status", "Status"),
      key: 4,
      dataIndex: "status",
    },
    {
      title: getColumnTitle("user", "User"),
      key: 5,
      dataIndex: "user",
    },
    {
      title: getColumnTitle("description", "Description"),
      key: 6,
      dataIndex: "description",
      render: (a) => (
        <span>
          {a.substring(0, 15)} {a.length > 15 ? "..." : ""}
        </span>
      ),
    },
    {
      title: getColumnTitle("startDate", "Start date"),
      key: 7,
      dataIndex: "startDate",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: getColumnTitle("deadline", "Deadline"),
      key: 8,
      dataIndex: "deadline",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "",
      key: 9,
      dataIndex: "buttons",
      render: (b) => {
        return (
          <div className="buttons">
            {b.status !== 3 ? (
              <Tooltip placement="topRight" title={"Finish task"}>
                <CheckOutlined
                  className="mr-10"
                  onClick={() => handleStatusChange(3, b.id)}
                />
              </Tooltip>
            ) : null}
            {b.status !== 2 ? (
              <Tooltip placement="topRight" title={"Start task"}>
                <AimOutlined
                  className="mr-10"
                  onClick={() => handleStatusChange(2, b.id)}
                />
              </Tooltip>
            ) : null}
            {b.status !== 1 ? (
              <Tooltip placement="topRight" title={"Move to waiting"}>
                <ExclamationOutlined
                  onClick={() => handleStatusChange(1, b.id)}
                />
              </Tooltip>
            ) : null}
          </div>
        );
      },
    },
    {
      title: "",
      key: 10,
      dataIndex: "buttons",
      render: (b) => {
        return (
          <div className="buttons">
            <Tooltip placement="topRight" title={"Edit task"}>
              <EditOutlined
                className="mr-10"
                onClick={() => editRow(b.index)}
              />
            </Tooltip>
            <Popconfirm
              placement="rightTop"
              title={"Are you sure to delete this task?"}
              onConfirm={() => deleteRow(b.index)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip placement="topRight" title={"Delete task"}>
                <DeleteOutlined className="mr-10" />
              </Tooltip>
            </Popconfirm>
            <Tooltip placement="topRight" title={"View description"}>
              <EyeOutlined onClick={() => viewRow(b.index)} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const editRow = (index) => {
    props.setEditToDo(props.todos[index], index);
  };

  const deleteRow = (index) => {
    props.deleteToDo(index);
  };

  const viewRow = (index) => {
    Modal.info({
      title: props.todos[index].title,
      content: (
        <div>
          <p>{props.todos[index].description}</p>
        </div>
      ),
      maskClosable: true,
      onOk() {},
    });
  };

  const dataSource = props.todos.map((t, index) => {
    return {
      ...t,
      key: index,
      no: index + 1,
      priority: t.priority.name,
      status: t.status.name,
      user: t.user.fullname,
      buttons: { index, id: t.id, status: t.status.id },
    };
  });

  const sortArray = () => {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(sortKey) || !b.hasOwnProperty(sortKey)) {
        return 0;
      }

      const varA =
        typeof a[sortKey] === "string" ? a[sortKey].toUpperCase() : a[sortKey];
      const varB =
        typeof b[sortKey] === "string" ? b[sortKey].toUpperCase() : b[sortKey];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  return (
    <Table
      dataSource={dataSource.sort(sortArray()).map((t, index) => {
        return {
          ...t,
          no: index + 1,
        };
      })}
      columns={columns}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

const mapStateToProps = ({ todos, options }) => {
  return { todos, options };
};

export default connect(mapStateToProps, {
  changeStatus,
  setEditToDo,
  deleteToDo,
})(View);