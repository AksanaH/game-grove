import React, { useState } from "react";
import { Col, Row } from "antd";
import Gamecard from "../components/Gamecard";

export default function Home() {
  const [items1, setItems1] = useState([
    {
      title: "Item 1",
      description: "Description for item 1",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 2",
      description: "Description for item 2",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 3",
      description: "Description for item 3",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 4",
      description: "Description for item 4",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 5",
      description: "Description for item 5",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ]);

  const [items2, setItems2] = useState([
    {
      title: "Item 6",
      description: "Description for item 6",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 7",
      description: "Description for item 7",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 8",
      description: "Description for item 8",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 9",
      description: "Description for item 9",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 10",
      description: "Description for item 10",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ]);

  const [items3, setItems3] = useState([
    {
      title: "Item 11",
      description: "Description for item 11",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 12",
      description: "Description for item 12",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 13",
      description: "Description for item 13",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 14",
      description: "Description for item 14",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "Item 15",
      description: "Description for item 15",
      image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ]);

  return (
    <>
      <div className="popular-games">
        <h1>Popular Games</h1>
      </div>
      <div>
        <Row gutter={[20, 10]}justify = "center">
          {items1.map((item, index) => (
            <Col key={index} xs={24} sm={24} md={8} lg={6} xl={4}>
              <Gamecard
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </Col>
          ))}
        </Row>
      </div>
      <div className="popular-games">
        <h1>Popular Games</h1>
      </div>
      <div>
        <Row gutter={[20, 10]}justify="center">
          {items2.map((item, index) => (
            <Col key={index} xs={24} sm={24} md={8} lg={6} xl={4}>
              <Gamecard
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </Col>
          ))}
        </Row>
      </div>
      <div className="popular-games">
        <h1>Popular Games</h1>
      </div>
      <div >
        <Row gutter={[20, 10]}justify="center">
          {items3.map((item, index) => (
            <Col key={index} xs={24} sm={24} md={8} lg={6} xl={4}>
              <Gamecard
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
