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


const SavedGames = () => {
  const [tabPosition] = useState("left");
  const { loading, data } = useQuery(SINGLE_USER);
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
        width: 200,
        backgroundColor: "#657441e0",
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
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <CheckSquareFilled
            key="check"
            onClick={() => handlePlayedGame(game.gameId)}
          />
          |
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

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error loading data" type="error" />;

  const gamesData = userData.games || [];

  return (
    <>
      <Layout>
        <section className="background">
          <div className="tabs-container">
            <Tabs
              tabPosition={tabPosition}
              items={tabData.map((item, i) => {
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
