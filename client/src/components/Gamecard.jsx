/* eslint-disable react/prop-types */
import React from "react";
import { Card } from "antd";
const { Meta } = Card;
const Gamecard = ({
    title = "Europe Street beat",
    description = "www.instagram.com",
    image = "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
}) => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={
      <img
        alt="example"
        src={image}
      />
    }
  >
    <Meta title={title} description={description} />
  </Card>
);
export default Gamecard;
