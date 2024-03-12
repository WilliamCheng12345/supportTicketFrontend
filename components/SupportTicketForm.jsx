import React from 'react';
import { Form, Input, Button, message } from 'antd';

const { TextArea } = Input;
import axios from 'axios';

const onFinish = (values) => {
  const { name, email, description } = values;

  axios.post(" https://supportticketbackend.azurewebsites.net/supportTicket/createRequest",{
    name, email, description, 
    status: 1
  })            
  .then((res) => console.log(res))
  .catch((err) => console.error('ERR: ', err));;

  message.success('Form submitted successfully!');
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
  message.error('Form submission failed!');
};

const SupportTicketForm = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="basicForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      layout="vertical" // This sets the layout of the form
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input a description of the problem you are experiencing!' }]}
      >
         <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SupportTicketForm;
