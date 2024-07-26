import React, { useState, useEffect } from "react";
import { Button, Form, Card, Container, Row, Col } from "antd";
import Auth from "../utils/auth";
import { removeGameId } from "../utils/localStorage";
import {
  DELETE_GAME,
  SAVE_GAME,
  RATE_GAME,
  PLAYED_GAME,
} from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { SINGLE_USER } from "../utils/queries";

const SavedGames = () => {
  const { loading, data } = useQuery(SINGLE_USER);
  const [deleteGame, { error }] = useMutation(DELETE_GAME);
  const [rateGame, { error }] = useMutation(RATE_GAME);
  const [playedGame, { error }] = useMutation(PLAYED_GAME);
  const userData = data?.getSingleUser || {};
  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await deleteGame({
        variables: { bookId },
      });

      removeGameId(gameId);
    } catch (err) {
      console.error(err);
    }
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

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing Saved Games!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData?.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${
                userData.savedGames.length === 1 ? "game" : "games"
              }:`
            : "You have no saved games!"}
        </h2>
        <Row>
          {userData?.savedGames.map((game) => {
            const [rating, setRating] = React.useState("");
            return (
              <Col md="4" key={game.gameId}>
                <Card border="dark">
                  {game.image ? (
                    <Card.Img
                      src={game.image}
                      alt={`The cover for ${game.title}`}
                      variant="top"
                      style={{
                        height: "250px",
                        objectFit: "contain",
                      }}
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <p className="small">Creators: {game.creators}</p>
                    <Card.Text>{game.description}</Card.Text>
                    <Form.Group controlId="rating">
                      <Form.Label>Rate this game:</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        placeholder="Enter rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      className="btn-block btn-primary"
                      onClick={() =>
                        handleRateGame(game.gameId, parseInt(rating))
                      }
                    >
                      Submit Rating
                    </Button>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteGame(game.gameId)}
                    >
                      Remove Game!
                    </Button>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handlePlayedGame(game.gameId)}
                    >
                      Played Game!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedGames;
