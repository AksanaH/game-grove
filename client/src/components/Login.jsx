import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../utils/mutations';
import Auth from '../utils/auth'; // Ensure this is correctly imported

const Login = () => {
  const [login, { error, data }] = useMutation(USER_LOGIN);

  // Handle form submission
  const handleFormSubmit = async (values) => {
    try {
      const { data } = await login({
        variables: { ...values },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error("Error during login:", e.message);
      if (e.graphQLErrors) {
        e.graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      }
      if (e.networkError) {
        console.log(`[Network error]: ${e.networkError.message}`);
      }
    }
  };

  // Handle form submission failure
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleFormSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;