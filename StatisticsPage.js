import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import URLCard from '../components/URLCard';
import { useNavigate } from 'react-router-dom';

const StatisticsPage = () => {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shortUrls')) || [];
    setUrls(stored);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Shortened URLs Statistics</Typography>
      <Button variant="outlined" sx={{ mb: 2 }} onClick={() => navigate('/')}>Back to Shortener</Button>
      {urls.map((item, idx) => (
        <URLCard key={idx} data={item} />
      ))}
    </Container>
  );
};

export default StatisticsPage;
