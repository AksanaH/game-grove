w; // FilterButton.jsx
import React, { useState } from "react";
import { Button, Modal, Checkbox } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const FilterButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Apply the selected options logic here
    console.log("Selected Options:", selectedOptions);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (checkedValues) => {
    setSelectedOptions(checkedValues);
  };

  return (
    <>
      <Button type="primary" icon={<FilterOutlined />} onClick={showModal}>
        Filter
      </Button>
      <Modal
        title="Select Options"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Checkbox.Group options={options} onChange={onChange} />
      </Modal>
    </>
  );
};

export default FilterButton;
