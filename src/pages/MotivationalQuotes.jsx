import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const quoteStyle = {
  fontStyle: 'italic',
  textAlign: 'center',
};

const cardStyle = {
  maxWidth: 500,
  margin: 'auto',
  marginTop: 20,
  padding: 20,
  textAlign: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
};

function MotivationalQuotes() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => setQuote(data.content))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Fetch a quote when component mounts

  const handlePrevClick = () => {
    // Implement previous quote logic here
  };

  const handleNextClick = () => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => setQuote(data.content))
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Motivational Quotes</h1>
      <Card sx={cardStyle}>
        <CardContent>
          <blockquote style={quoteStyle}>{quote}</blockquote>
          <div style={{ marginTop: 20 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevClick}
              style={{ marginRight: 10 }}
            >
              Previous
            </Button>
            <Button variant="contained" color="primary" onClick={handleNextClick}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MotivationalQuotes;
