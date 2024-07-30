import { useState, useEffect } from "react";
import { Button, Input, message, Space, Form } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER_BIO } from "../utils/mutations"; // Define this mutation in your GraphQL mutations
import { SINGLE_USER } from "../utils/queries";

const BioForm = () => {
  const [updateBio] = useMutation(UPDATE_USER_BIO);
  const { loading, data } = useQuery(SINGLE_USER);
  const [bio, setBio] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    if (!loading) {
      setBio(data.getUser.bio);
    }
  }, [loading]);

  const handleFormSubmit = async ({ status }) => {
    try {
      const { data } = await updateBio({
        variables: { bio: status },
      });
      setBio(data.updateUserBio.bio);
      setUpdatedBio("");
      form.resetFields();
      console.log("Update response:", data, updatedBio);
      message.success("Bio updated successfully!");
    } catch (e) {
      console.error("Error updating bio:", e);
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
      message.error("Failed to update bio.");
    }
  };

  return (
    <div className="profile ant-tabs ant-tabs-left css-dev-only-do-not-override-1uq9j6g">
      <p className="bio-text">{bio}</p>
      <Form form={form} onFinish={handleFormSubmit}>
        <Space.Compact>
          <Form.Item name="status">
            <Input placeholder="What is on your mind?" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space.Compact>
      </Form>
    </div>
  );
};

export default BioForm;
