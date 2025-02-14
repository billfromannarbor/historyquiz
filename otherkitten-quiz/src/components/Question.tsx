import { useState } from 'react';
import { Typography, Button, List, ListItem, ListItemText } from '@mui/material';

interface QuestionProps {
  segment: any;
  onScore: (points: number) => void;
}

function Question({ segment, onScore }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const answerSelected = (index: number) => {
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    setShowAnswer(true);
    if (selectedAnswer === segment.questions[0].correct) {
      onScore(50); // Example scoring logic
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        {segment.questions[0].text}
      </Typography>
      <List>
        {segment.questions[0].answers.map((answer: string, index: number) => (
          <ListItem
            component="button"
            key={index}
            onClick={() => answerSelected(index)}
          >
            <ListItemText primary={answer} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={submitAnswer}>
        Submit Answer
      </Button>
      {showAnswer && (
        <Typography variant="body2" color="textSecondary">
          Correct Answer: {segment.questions[0].answers[segment.questions[0].correct]}
        </Typography>
      )}
    </div>
  );
}

export default Question; 