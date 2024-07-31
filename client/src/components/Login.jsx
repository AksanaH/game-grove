import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login] = useMutation(USER_LOGIN);
  const navigate = useNavigate();

  // Handle form submission
  const handleFormSubmit = async (values) => {
    console.log("Submitted values:", values);
    try {
      const { data } = await login({
        variables: { ...values },
      });
      console.log("Login data:", data);
      Auth.login(data.login.token);
      navigate("/");
    } catch (e) {
      console.error("Error during login:", e);
      if (e.graphQLErrors) {
        e.graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (e.networkError) {
        console.log(`[Network error]: ${e.networkError.message}`);
      }
    }
  };

  // Handle form submission failure
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row
        className="background"
        justify="center"
        align="middle"
        style={{ height: "100vh", textAlign: "center" }}
      >
        <Col sm={24} md={10}>
          <div className="container">
            <h1>Login</h1>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={handleFormSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 5, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
