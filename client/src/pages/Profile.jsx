import { useState } from "react";
import { Button, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { UPLOAD_IMAGE } from "../utils/mutations";
import Bio from "../components/Bio";
import Auth from "../utils/auth";
const Avatar = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [uploadFile] = useMutation(UPLOAD_IMAGE);

  if (!Auth.loggedIn()) {
    return <p>You need to be logged in to update your bio.</p>;
  }

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

  return (
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
  );
};

export default Avatar;
