import React, { useState, useEffect } from "react";
import { Card, Tabs, Rate, Layout, Spin, Alert, Tooltip, Row, Col } from "antd";
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

const SavedGames = () => {
  const [tabPosition, setTabPosition] = useState("left");
  const { loading, error, data } = useQuery(SINGLE_USER);
  const [deleteGame, { error: deleteError }] = useMutation(DELETE_GAME);
  const [rateGame, { error: rateError }] = useMutation(RATE_GAME);
  const [playedGame, { error: playedError }] = useMutation(PLAYED_GAME);
  const [ratingError, setRatingError] = useState(null);
  const [playedErrorState, setPlayedErrorState] = useState(null);
  const [deleteErrorState, setDeleteErrorState] = useState(null);

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
      await deleteGame({
        variables: { gameId },
      });

      removeGameId(gameId);
      setDeleteErrorState(null);
    } catch (err) {
      setDeleteErrorState("Error deleting game");
      console.error("Error deleting game:", err);
    }
  };
  const Games = ({ games }) => (
    <Row gutter={[8, 8]}>
      {games && games.length > 0 ? (
        games.map((game) => (
          <Col key={game.gameId} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{
                width: "150px",
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
                      key="check"
                      onClick={() => handlePlayedGame(game.gameId)}
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
                          onClick={() => handleDeleteGame(game.gameId)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))
      ) : (
        <p>No games saved yet.</p>
      )}
    </Row>
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
              <Games games={userData.recentlyDeleted} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default SavedGames;
