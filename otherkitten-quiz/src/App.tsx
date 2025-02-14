import { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import Game from './components/Game';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <Container maxWidth="md">
      {!gameStarted ? (
        <div>
          <Typography variant="h2" align="center" gutterBottom>
            OtherKitten Lost In Time
          </Typography>
          <Typography variant="body1" paragraph>
            You are a historian—or at least, you thought you were—until the day you found Otherkitten, a mysterious cat with an uncanny ability to vanish and reappear in different historical periods...
          </Typography>
          <Button variant="contained" color="primary" onClick={startGame}>
            Start Game
          </Button>
        </div>
      ) : (
        <Game />
      )}
    </Container>
  );
}

export default App;
