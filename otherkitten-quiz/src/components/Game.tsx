import   { useState } from 'react';
import { Typography, Button, Card, CardContent } from '@mui/material';
import Question from './Question';
import segments from '../segments.json'; // Ensure this file is available

function Game() {
  const [currentSegment, setCurrentSegment] = useState(0);
  const [score, setScore] = useState(0);

  const nextSegment = () => {
    setCurrentSegment((prev) => prev + 1);
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        {segments[currentSegment].title}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" paragraph>
            {segments[currentSegment].introduction}
          </Typography>
          <Question
            segment={segments[currentSegment]}
            onScore={(points: number) => setScore(score + points)}
          />
          <Button variant="contained" color="secondary" onClick={nextSegment}>
            Next Segment
          </Button>
        </CardContent>
      </Card>
      <Typography variant="h6" align="center" gutterBottom>
        Score: {score}
      </Typography>
    </div>
  );
}

export default Game; 