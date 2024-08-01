import React, { useState, useEffect } from "react";
import {
  Card,
  Tabs,
  Rate,
  Layout,
  Spin,
  Alert,
  Tooltip,
  Row,
  Col,
  Carousel,
} from "antd";
import { DeleteFilled, CheckSquareFilled } from "@ant-design/icons";
import "../App.css";
import Auth from "../utils/auth";
import { DELETE_GAME, RATE_GAME, PLAYED_GAME } from "../utils/mutations";
import { removeGameId } from "../utils/localStorage";
import { useMutation, useQuery } from "@apollo/client";
import { SINGLE_USER } from "../utils/queries";
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
  const { loading, error, data } = useQuery(SINGLE_USER);
  const [deleteGame, { error: deleteError }] = useMutation(DELETE_GAME);
  const [rateGame, { error: rateError }] = useMutation(RATE_GAME);
  const [playedGame, { error: playedError }] = useMutation(PLAYED_GAME);
  const [ratingError, setRatingError] = useState(null);
  const [playedErrorState, setPlayedErrorState] = useState(null);
  const [deleteErrorState, setDeleteErrorState] = useState(null);
  const [recentlyDeleted, setRecentlyDeleted] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleResize = () => {
      setTabPosition(window.innerWidth < 768 ? "top" : "left");
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error loading user data" type="error" />;
  if (deleteError || rateError || playedError)
    return <Alert message="Error performing operation" type="error" />;

  const userData = data?.getUser || {
    savedGames: [],
    playedGames: [],
    recentlyDeleted: [],
  };

  const handleRateGame = async (gameId, rating) => {
    console.log({ gameId, rating });

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await rateGame({
        variables: { gameId, rating },
      });
      setRatingError(null);
    } catch (err) {
      setRatingError("Error rating game");
      console.error("Error rating game:", err);
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
      setPlayedErrorState(null);
    } catch (err) {
      setPlayedErrorState("Error marking game as played");
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
      setDeleteErrorState(null);
    } catch (err) {
      setDeleteErrorState("Error deleting game");
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
                  height: "50%",
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
                  onChange={(value) => handleRateGame(game.gameId, value)}
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span>{game.description}</span>
                <div style={{ display: "flex", gap: "10px" }}>
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
