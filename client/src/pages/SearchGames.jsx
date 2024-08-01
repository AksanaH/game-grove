import React, { useState } from "react";
import { Layout, Row, Col, Button, Card, Input, Rate, Alert } from "antd";
import { searchGames } from "../utils/API"; // Adjust path if needed
import { useMutation } from "@apollo/client";
import { SAVE_GAME } from "../utils/mutations"; // Adjust path if needed
import Auth from "../utils/auth"; // Adjust path if needed
import DOMPurify from "dompurify";
import "../App.css"; // Make sure this file contains the CSS class
const { Content } = Layout;
const { Meta } = Card;

const SearchGames = () => {
  const [searchedGames, setSearchedGames] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [saveGame] = useMutation(SAVE_GAME);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const games = await searchGames(searchInput);
      const gameData = games.map((game) => ({
        id: game.id.toString(),
        name: game.name,
        description: game.description || "No description available",
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
      setAlertMessage("Saved Game Successful");
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
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

  const toggleDescription = (gameId) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [gameId]: !prevState[gameId],
    }));
  };

  const renderDescription = (game) => {
    const isExpanded = expandedDescriptions[game.id];
    const description = DOMPurify.sanitize(game.description);
    const shortDescription = description.slice(0, 300); // Adjust length as needed

    return (
      <div>
        <div
          className={`description ${isExpanded ? "" : "clamped"}`}
          dangerouslySetInnerHTML={{
            __html: isExpanded ? description : `${shortDescription}...`,
          }}
        />
        <Button type="link" onClick={() => toggleDescription(game.id)}>
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      </div>
    );
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
        {alertVisible && (
          <Row justify="center" style={{ marginTop: "20px" }}>
            <Col span={24}>
              <Alert message={alertMessage} type="success" showIcon />
            </Col>
          </Row>
        )}
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
                ]}
              >
                <Meta title={game.name} description={renderDescription(game)} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default SearchGames;
