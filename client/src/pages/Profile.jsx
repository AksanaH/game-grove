import { useState, useEffect } from "react";
import { Button, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { UPLOAD_IMAGE } from "../utils/mutations";
import Bio from "../components/Bio";
import Auth from "../utils/auth";

const Avatar = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [uploadFile] = useMutation(UPLOAD_IMAGE);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate("/"); // Redirect to home if not logged in
    }
  }, []);

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      message.success(`${info.file.name} file uploaded successfully`);

      // Perform GraphQL upload
      const { data } = await uploadFile({
        variables: { file: info.file.originFileObj },
      });
      console.log("GraphQL Upload Response:", data);
    }
  };

  const uploadButton = (
    <Button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </Button>
  );

  // Conditionally render the profile content if the user is logged in
  return Auth.loggedIn() ? (
    <div className="background tabs-container ">
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        customRequest={({ file, onSuccess }) => {
          // Constructing formData for the GraphQL request
          const formData = new FormData();
          formData.append("file", file);

          // Send the file to the GraphQL server
          fetch("http://localhost:3000/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data", // Set the Content-Type header
              "x-apollo-operation-name": "uploadFile", // Example header, if needed
              "apollo-require-preflight": "true", // Example header, if needed
            },
            body: formData,
          })
            .then((response) => response.json())
            .then(() => onSuccess());
        }}
        showUploadList={false}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <Bio />
    </div>
  ) : null; // Return null or a loading indicator if not logged in
};

export default Avatar;
