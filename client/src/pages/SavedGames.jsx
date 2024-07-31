import React, { useState, useEffect } from "react";
import { Card, Tabs, Rate, Layout } from "antd";
import { DeleteFilled, CheckSquareFilled } from "@ant-design/icons";
import "../App.css";
import Auth from "../utils/auth";
import { DELETE_GAME, RATE_GAME, PLAYED_GAME } from "../utils/mutations";
import { removeGameId } from "../utils/localStorage";
import { useMutation, useQuery } from "@apollo/client";
import { SINGLE_USER } from "../utils/queries";
const { Meta } = Card;

const TabName = ({ item }) => {
  return <h1 className="tabs-btn">{item.title}</h1>;
};
const data = [
  { id: 1, title: "Saved Games", description: "game1" },
  { id: 2, title: "Played Games", description: "game2" },
  { id: 3, title: "Recently Deleted", description: "game3" },
];

const SavedGames = () => {
  const [tabPosition, setTabPosition] = useState("left");
  useEffect(() => {
    const handleResize = () => {
      setTabPosition(window.innerWidth < 768 ? "top" : "left");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // const { loading, data } = useQuery(SINGLE_USER);
  const [deleteGame, { error }] = useMutation(DELETE_GAME);
  const [rateGame] = useMutation(RATE_GAME);
  const [playedGame] = useMutation(PLAYED_GAME);
  const userData = data?.getSingleUser || {};
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
  const Games = ({ game }) => (
    <Card
      style={{
        width: "100%",
        maxWidth: "300px",
        backgroundColor: "#657441e0",
        margin: "0 auto",
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
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
          <CheckSquareFilled
            key="check"
            onClick={() => handlePlayedGame(game.gameId)}
          />

          <Rate
            key="rate"
            onChange={(value) => handleRateGame(game.gameId, value)}
          />
        </div>,
      ]}
    >
      <Meta
        title={game.title}
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
  );
  return (
    <>
      <Layout>
        <section className="background">
          <div className="tabs-container">
            <Tabs
              tabPosition={tabPosition}
              items={data.map((item, i) => {
                const id = String(i + 1);
                return {
                  label: <TabName item={item} />,
                  key: id,
                  children: <Games game={item} />,
                };
              })}
            />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SavedGames;
