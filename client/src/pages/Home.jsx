import React, { useEffect, useState } from "react";
import { Col, Row, Grid } from "antd";
import Gamecard from "../components/Gamecard";
import { getAllGames } from "../utils/API";

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

  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await getAllGames();
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const { results } = await response.json();
        console.log(results);
        setGames(results);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="content">
      <div className="text-center">
        <Row gutter={[20, 10]}>
          <Col span={24}>
            <h1>Welcome Gamers! </h1>
          </Col>
        </Row>
      </div>
      <div className="popular-games">
      </div>
      <div>
        <Row gutter={[20, 10]} justify="center">
          {games.map((item, index) => (
            <Col key={index} xs={24} sm={24} md={8} lg={6} xl={6}>
              <Gamecard
                title={item.name}
                description={`Genre: ${item.genres[0].name} |
                ★ ${item.rating}`}
                image={item.background_image}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
