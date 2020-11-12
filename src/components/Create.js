import React, { useEffect } from "react";
import { Form, Row, Col, Input, Select, DatePicker, Button } from "antd";
import { connect } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { addToDo, editToDo, resetForm } from "../redux/actions";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

const rules = [{ required: true, message: "Field is required" }];

const Create = (props) => {
  const [form] = useForm();

  useEffect(() => {
    if (props.todoForm !== null) {
      console.log(props.todoForm);
      form.setFieldsValue({
        ...props.todoForm.data,
        priority: props.todoForm.data.priority.id,
        user: props.todoForm.data.user.id,
        startDate: moment(props.todoForm.data.startDate),
        deadline: moment(props.todoForm.data.deadline),
      });
    }
  }, [props.todoForm, form]);

  const { options } = props;

  const handleFormSubmit = (values) => {
    let data = {
      ...values,
      priority: options.priorities.find((o) => o.id === values.priority),
      status: options.statuses[0],
      user: options.users.find((o) => o.id === values.user),
    };
    if (props.todoForm !== null) {
      props.editToDo(data, props.todoForm.index);
      props.resetForm();
    } else {
      props.addToDo(data);
    }
    form.resetFields();
  };

  const resetForm = () => {
    form.resetFields();
    props.resetForm();
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Form.Item name="title" label="Title" rules={rules}>
            <Input className="w-100" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="user" label="User" rules={rules}>
            <Select className="w-100">
              {options.users.map((o, index) => {
                return (
                  <Option key={index} value={o.id}>
                    {o.fullname}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="priority" label="Priority" rules={rules}>
            <Select className="w-100">
              {options.priorities.map((o, index) => {
                return (
                  <Option key={index} value={o.id}>
                    {o.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="description" label="Description" rules={rules}>
            <TextArea className="w-100" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="deadline" label="Deadline" rules={rules}>
            <DatePicker className="w-100" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="startDate" label="Start date" rules={rules}>
            <DatePicker className="w-100" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button type="primary" htmlType="submit" className="fr">
            {props.todoForm !== null ? "Edit item" : "Add to list"}
          </Button>
          {props.todoForm !== null ? (
            <Button type="primary" onClick={resetForm} className="fr mr-5">
              Reset form
            </Button>
          ) : null}
        </Col>
      </Row>
    </Form>
  );
};

const mapStateToProps = ({ options, todoForm }) => {
  return { options, todoForm };
};

export default connect(mapStateToProps, { addToDo, editToDo, resetForm })(
  Create
);