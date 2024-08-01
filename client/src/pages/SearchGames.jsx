import React, { useState } from "react";
import { Layout, Row, Col, Button, Card, Input, Rate } from "antd";
import { searchGames } from "../utils/API"; // Adjust path if needed
import { useMutation } from "@apollo/client";
import { SAVE_GAME, RATE_GAME } from "../utils/mutations"; // Adjust path if needed
import Auth from "../utils/auth"; // Adjust path if needed
import "../App.css";
const { Content } = Layout;
const { Meta } = Card;

const SearchGames = () => {
  const [searchedGames, setSearchedGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [saveGame] = useMutation(SAVE_GAME);
  const [rateGame] = useMutation(RATE_GAME);
  const [rating, setRating] = useState({});

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGames(searchInput);
      const data = await response.json();
      const gameData = data.results.map((game) => ({
        id: game.id.toString(),
        name: game.name,
        description:
          game.description ||
          game.short_description ||
          "No description available",
        released: game.released || "",
        image: game.background_image || "",
        website: game.website || "",
        creators: game.creators || [],
      }));
      setSearchedGames(gameData);
      setSearchInput("");
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  const handleSaveGame = async (game) => {
    if (!Auth.loggedIn()) {
      console.error("User is not logged in.");
      return;
    }

    const gameData = {
      id: game.id,
      name: game.name,
      description: game.description,
      released: game.released,
      image: game.image,
      website: game.website,
      creators: game.creators,
    };

    try {
      const { data } = await saveGame({ variables: { gameData } });
      console.log("Game saved successfully:", data);
    } catch (err) {
      console.error("Error saving game:", err.message);
      if (err.graphQLErrors) {
        err.graphQLErrors.forEach(({ message }) =>
          console.error("GraphQL error:", message)
        );
      }
      if (err.networkError) {
        console.error("Network error:", err.networkError);
      }
    }
  };

  const handleRateGame = async (gameId, rating) => {
    try {
      await rateGame({ variables: { gameId, rating } });
      setRating((prev) => ({ ...prev, [gameId]: rating }));
    } catch (err) {
      console.error("Error rating game:", err.message);
      if (err.graphQLErrors) {
        err.graphQLErrors.forEach(({ message }) =>
          console.error("GraphQL error:", message)
        );
      }
      if (err.networkError) {
        console.error("Network error:", err.networkError);
      }
    }
  };

  return (
    <Layout>
      <Content
        style={{
          padding: "50px",
          backgroundColor: "#495330d3",
        }}
      >
        <Row justify="center">
          <Col span={24} style={{ textAlign: "center" }}>
            <h1>Search for Games!</h1>
            <form onSubmit={handleFormSubmit}>
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for a game"
                style={{
                  width: "300px",
                  marginRight: "10px",
                }}
              />
              <Button
                type="primary"
                htmlType="submit"
                className="search-button"
              >
                Submit Search
              </Button>
            </form>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "20px" }}>
          {searchedGames.map((game) => (
            <Col key={game.id} span={8}>
              <Card
                hoverable
                cover={
                  <img
                    alt={game.name}
                    src={game.image || "https://via.placeholder.com/150"}
                  />
                }
                actions={[
                  <Button key="save" onClick={() => handleSaveGame(game)}>
                    Save
                  </Button>,
                  <Rate
                    key="rate"
                    allowClear={false}
                    onChange={(value) => handleRateGame(game.id, value)}
                    value={rating[game.id] || 0}
                  />,
                ]}
              >
                <Meta title={game.name} description={game.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default SearchGames;
