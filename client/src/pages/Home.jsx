import { Col, Row } from "antd";
import Gamecard from "../components/Gamecard";
export default function Home() {
  const items = [
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
  ];
  return (
    <div>
      <h1>Welcome Gamers!</h1>
      <Row gutter={[6, 32]}>
        {items.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Gamecard
              title={item.title}
              description={item.description}
              image={item.image}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}