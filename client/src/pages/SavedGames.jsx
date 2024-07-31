import React, { useState, useEffect } from "react";
import { Card, Tabs, Rate, Layout, Spin, Alert } from "antd";
import { DeleteFilled, CheckSquareFilled } from "@ant-design/icons";
import "../App.css";
import Auth from "../utils/auth";
import { DELETE_GAME, RATE_GAME, PLAYED_GAME } from "../utils/mutations";
import { removeGameId } from "../utils/localStorage";
import { useMutation, useQuery } from "@apollo/client";
import { SINGLE_USER } from "../utils/queries";
const { Meta } = Card;

const tabData = [
  { id: 1, title: "Saved Games", description: "game1" },
  { id: 2, title: "Played Games", description: "game2" },
  { id: 3, title: "Recently Deleted Games", description: "game3" },
];

const TabName = ({ item }) => {
  return <h1 className="tabs-btn">{item.title}</h1>;
};

const TabName = ({ title }) => {
  return <h1 className="tabs-btn">{title}</h1>;
};

const SavedGames = () => {
  const [tabPosition] = useState("left");
  const { loading, data } = useQuery(SINGLE_USER);
  const [tabPosition, setTabPosition] = useState("left");
  useEffect(() => {
    const handleResize = () => {
      setTabPosition(window.innerWidth < 768 ? "top" : "left");
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { loading, data } = useQuery(SINGLE_USER);
  const [deleteGame, { error }] = useMutation(DELETE_GAME);
  const [rateGame] = useMutation(RATE_GAME);
  const [playedGame] = useMutation(PLAYED_GAME);

  const userData = data?.getUser || {
    savedGames: [],
    playedGames: [],
    recentlyDeleted: [],
  };

  const handleRateGame = async (gameId, rating) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await rateGame({
        variables: { gameId, rating },
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handlePlayedGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await playedGame({
        variables: { gameId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await deleteGame({
        variables: { gameId },
      });

      removeGameId(gameId);
    } catch (err) {
      console.error(err);
    }
  };
  const Games = ({ games }) => (
    <div className="games-container">
      {games && games.length > 0 ? (
        games.map((game) => (
          <Card
            key={game.gameId}
            style={{
              width: "100%",
              maxWidth: "300px",
              backgroundColor: "#657441e0",
              margin: "0 auto",
            }}
            cover={
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  alt="example"
                  src={game.image || "https://via.placeholder.com/300"}
                  style={{ display: "block" }}
                />
                <CheckSquareFilled
                  key="check"
                  onClick={() => handlePlayedGame(game.gameId)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                />
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
                <Rate
                  key="rate"
                  value={game.rating}
                  onChange={(value) => handleRateGame(game.gameId, value)}
                />
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
                    <DeleteFilled
                      key="delete"
                      onClick={() => handleDeleteGame(game.gameId)}
                    />
                  </div>
                </div>
              }
            />
          </Card>
        ))
      ) : (
        <p>No games saved yet.</p>
      )}
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

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
