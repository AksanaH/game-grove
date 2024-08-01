import React, { useState, useEffect } from "react";
import {
  Card,
  Tabs,
  Rate,
  Layout,
  Alert,
  Tooltip,
  Row,
  Col,
  Carousel,
  Button,
} from "antd";
import { DeleteFilled, CheckSquareFilled } from "@ant-design/icons";
import "../App.css";
import Auth from "../utils/auth";
import { DELETE_GAME, RATE_GAME, PLAYED_GAME } from "../utils/mutations";
import { removeGameId } from "../utils/localStorage";
import { useMutation, useQuery } from "@apollo/client";
import { SINGLE_USER } from "../utils/queries";
import DOMPurify from "dompurify";
const { Meta } = Card;

const TabName = ({ title }) => {
  return <h1 className="tabs-btn">{title}</h1>;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const SavedGames = () => {
  const [tabPosition, setTabPosition] = useState("left");
  const { loading, error, data, refetch } = useQuery(SINGLE_USER);
  const [deleteGame, { error: deleteError }] = useMutation(DELETE_GAME);
  const [rateGame, { error: rateError }] = useMutation(RATE_GAME);
  const [playedGame, { error: playedError }] = useMutation(PLAYED_GAME);
  const [recentlyDeleted, setRecentlyDeleted] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const isMobile = useIsMobile();
  const [userData, setUserData] = useState({
    savedGames: [],
    playedGames: [],
    recentlyDeleted: [],
  });

  useEffect(() => {
    if (data) {
      setUserData(data.getUser);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setTabPosition(window.innerWidth < 768 ? "top" : "left");
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleRateGame = async (gameId, rating) => {
    console.log({ gameId, rating });

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await rateGame({
        variables: { gameId, rating },
      });

      console.log("Mutation response data:", data);

      if (data && data.rateGame && data.rateGame.savedGames) {
        // Update the savedGames state with the new rating
        const updatedGames = data.rateGame.savedGames;
        setUserData((prevUserData) => ({
          ...prevUserData,
          savedGames: updatedGames,
        }));

        // Refetch the user data to get the latest changes from the server
        refetch();
      } else {
        console.error("Unexpected response data format:", data);
      }
    } catch (err) {
      console.error("Error rating game:", err);
      if (err.graphQLErrors) {
        err.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }
      if (err.networkError) {
        console.error(`[Network error]: ${err.networkError}`);
      }
    }
  };

  const handlePlayedGame = async (gameId) => {
    console.log({ gameId });
    console.log("Game ID:", gameId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await playedGame({
        variables: { gameId },
      });
    } catch (err) {
      console.error("Error marking game as played:", err);
    }
  };

  const handleDeleteGame = async (gameId) => {
    console.log({ gameId });

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const gameToDelete = userData.savedGames.find(
        (game) => game.id === gameId
      );

      await deleteGame({
        variables: { gameId },
      });

      setRecentlyDeleted((prev) => [...prev, gameToDelete]);
      removeGameId(gameId);
    } catch (err) {
      console.error("Error deleting game:", err);
      if (err.graphQLErrors) {
        err.graphQLErrors.forEach(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (err.networkError) {
        console.error(`[Network error]: ${err.networkError}`);
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

  const renderCards = (games) =>
    (games || []).map((game) => (
      <Col
        key={game.gameId}
        xs={24}
        sm={12}
        md={8}
        lg={6}
        className="card-container"
      >
        <Card
          style={{
            width: "100%",
            backgroundColor: "#657441e0",
            margin: "auto",
          }}
          cover={
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                alt="example"
                src={game.image || "https://via.placeholder.com/300"}
                style={{
                  width: "100%",
                  height: "80%",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
              <Tooltip title="Mark as played">
                <CheckSquareFilled
                  onClick={() => handlePlayedGame(game.id)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    backgroundColor: "#ffffff",
                    fontSize: "20px",
                  }}
                />
              </Tooltip>
            </div>
          }
          actions={[
            <div
              key="actions"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 10px",
                fontSize: "1.2rem",
              }}
            >
              <Tooltip title="Rate Me">
                <Rate
                  key="rate"
                  value={game.rating}
                  onChange={(value) => handleRateGame(game.id, value)}
                />
              </Tooltip>
            </div>,
          ]}
        >
          <Meta
            title={game.name}
            description={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {renderDescription(game)}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Delete Game">
                    <DeleteFilled
                      key="delete"
                      onClick={() => handleDeleteGame(game.id)}
                    />
                  </Tooltip>
                </div>
              </div>
            }
          />
        </Card>
      </Col>
    ));

  const Games = ({ games }) =>
    isMobile ? (
      <Carousel arrows dotPosition="left" infinite={false}>
        {games.map((game) => (
          <div key={game.gameId} style={{ padding: "0 8px" }}>
            {renderCards([game])}
          </div>
        ))}
      </Carousel>
    ) : (
      <Row gutter={[8, 8]}>{renderCards(games)}</Row>
    );

  return (
    <Layout>
      <section className="background">
        <div className="tabs-container">
          <Tabs tabPosition={tabPosition}>
            <Tabs.TabPane tab={<TabName title="Saved Games" />} key="1">
              <Games games={userData.savedGames} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<TabName title="Played Games" />} key="2">
              <Games games={userData.playedGames} />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<TabName title="Recently Deleted" />} key="3">
              <Games games={recentlyDeleted} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default SavedGames;
