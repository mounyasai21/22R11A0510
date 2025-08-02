import React, { useState } from 'react';
import URLForm from '../components/URLForm';
import URLCard from '../components/URLCard';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShortenerPage = () => {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  const handleShorten = (newUrls) => {
    const withClicks = newUrls.map(url => ({
      ...url,
      clicks: [],
    }));
    setUrls(prev => [...prev, ...withClicks]);
    localStorage.setItem('shortUrls', JSON.stringify([...urls, ...withClicks]));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <URLForm onShorten={handleShorten} />
      <Button variant="outlined" sx={{ mt: 2, mb: 2 }} onClick={() => navigate('/stats')}>
        View Statistics
      </Button>
      {urls.map((item, idx) => (
        <URLCard key={idx} data={item} />
      ))}
    </Container>
  );
};

export default ShortenerPage;
