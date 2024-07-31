import React from "react";
import { Button, Form, Input,Row, Col } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupUser, { data, loading, error }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { username, email, password } = values;
      const response = await signupUser({
        variables: { username, email, password },
      });
      console.log("Signup successful:", response.data.signupUser);
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
      className="background"
      justify="center"
      align="middle"
      style={{ height: "100vh", textAlign: "center" }}
    >
      <Col sm={24} md={10}>
        <div className="container">
          <h1>Sign Up</h1>

          <Form
            name="signup"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 5,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Signup;
