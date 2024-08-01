import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import Gamecard from "../components/Gamecard";
import { getAllGames } from "../utils/API";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [games, setGames] = useState([]);

  const navigate = useNavigate();

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

const handleCardClick = (e) => {
  e.preventDefault();
  if (Auth.loggedIn()) {
    navigate("/searchgames");
  } else {
    navigate("/login");
  }
}


  return (
    <div className="content">
      <div className="text-center welcome-section">
        <Row gutter={[20, 10]}>
          <Col span={24}>
            <h1 className="welcome-title">Welcome Gamers!</h1>
          </Col>
          <Col span={24}>
            <p className="welcome-description">
              Our mission is to empower gamers with reliable, comprehensive, and
              unbiased game ratings. By signing up, users can add games to their
              queue, write reviews, and share their gaming experiences with
              friends. We aim to create a vibrant community where gamers can
              discover new favorites and make informed decisions about the games
              they play. Whether you're a casual player or a hardcore
              enthusiast, we're here to enhance your gaming journey with trusted
              reviews and a community-driven approach.
            </p>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[20, 10]} justify="center">
          {games.map((item, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={8} xl={6}>
              <Gamecard
                title={item.name}
                description={`Genre: ${item.genres[0].name} | ★ ${item.rating}`}
                image={item.background_image}
                onClick={handleCardClick}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
