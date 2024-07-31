import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { SAVE_GAME } from '../utils/mutations';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage'; 
import { searchGames } from '../utils/API'; 
import { Layout, Row, Col, Button, Card, Input } from 'antd';

const { Content } = Layout;
const { Meta } = Card;

const SearchGames = () => {
  const [searchedGames, setSearchedGames] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  const [saveGame] = useMutation(SAVE_GAME);

  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  }, [savedGameIds]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGames(searchInput); 
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { results } = await response.json();

      const gameData = results.map((game) => ({
        gameId: game.id,
        name: game.name,
        description: game.description || 'No description available',
        image: game.background_image || '',
      }));

      setSearchedGames(gameData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveGame = async (gameId) => {
    const gameToSave = searchedGames.find((game) => game.gameId === gameId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveGame({
        variables: { gameData: gameToSave },
      });

      setSavedGameIds([...savedGameIds, gameToSave.gameId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Row justify="center">
          <Col span={24} style={{ textAlign: 'center' }}>
            <h1>Search for Games!</h1>
            <form onSubmit={handleFormSubmit}>
              <Input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='Search for a game'
                style={{ width: '300px', marginRight: '10px' }}
              />
              <Button type='primary' htmlType='submit'>
                Submit Search
              </Button>
            </form>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '20px' }}>
          {searchedGames.map((game) => (
            <Col key={game.gameId} span={8}>
              <Card
                cover={<img alt={`Cover of ${game.name}`} src={game.image} />}
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